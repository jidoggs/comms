encrypt_staging_env: 
	gpg --symmetric --cipher-algo AES256 .env.staging

decrypt_staging_env:
	gpg --quiet --batch --yes --decrypt --passphrase='$(passphrase)' --output .env.staging  .env.staging.gpg

