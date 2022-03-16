package crypto

import (
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"errors"
	"log"

	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwe"
)

func Encrypt(pubKey string, data map[string]interface{}) (string, error) {
	log.Printf("[Crypto::Encrypt] encrypting...")

	block, _ := pem.Decode([]byte(pubKey))
	if block == nil {
		log.Println("[Crypto::Encrypt] pub key unformatted")
		return "", errors.New("pub key unformatted")
	}
	pKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		log.Println("[Crypto::Encrypt] error whiling parse public key")
		return "", err
	}

	dataToByte, err := json.Marshal(data)
	if err != nil {
		log.Printf("[Crypto::Encrypt] Marshal Error: %s\n", err.Error())
		return "", errors.New("JSON parse error")
	}

	encrypted, err := jwe.Encrypt(dataToByte, jwa.RSA_OAEP_256, pKey, jwa.A256CBC_HS512, jwa.NoCompress)

	if err != nil {
		log.Printf("[Crypto::Encrypt] JWE Encrypt Error: %s\n", err.Error())
		return "", errors.New("encrypt error")
	}

	log.Println("[Crypto::Encrypt] encrypted")

	return string(encrypted), nil
}
