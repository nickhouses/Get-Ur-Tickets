import json
from cryptography.fernet import Fernet

def generate_key(file_path):
    with open(file_path, 'wb') as f:
        f.write(Fernet.generate_key())

def get_key(file_path):
    with open(file_path, 'rb') as f:
        key = f.read()
    return key

def encrypt_file(file_path, key):
    with open(file_path, 'rb') as f:
        data = f.read()
    
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(data)
    
    with open(file_path, 'wb') as f:
        f.write(encrypted_data)

def decrypt_file(file_path, key):
    with open(file_path, 'rb') as f:
        data = f.read()
    
    fernet = Fernet(key)
    decrypted_data = fernet.decrypt(data)
    data = json.loads(decrypted_data)
    
    return data['ticket'], data['flight']