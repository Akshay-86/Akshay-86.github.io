"""
Portfolio OS - Password Encoder (SHA-256)

Usage:
    python encode_password.py

This script takes a plain-text password as input and outputs its SHA-256 hash.
Copy the hash and replace the ADMIN_HASH placeholder in:
    src/components/ui/TerminalUI.js (line ~15)

The hash is compared against the SHA-256 of the password entered in the
terminal's `sudo` command. Only the hash is stored in the code — not the
actual password.
"""

import hashlib

def encode(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

if __name__ == "__main__":
    print("=" * 50)
    print("  Portfolio OS - Password Encoder (SHA-256)")
    print("=" * 50)
    print()
    
    password = input("Enter the password to encode: ")
    
    if not password.strip():
        print("Error: Password cannot be empty.")
        exit(1)
    
    hashed = encode(password.strip())
    
    print()
    print(f"Plain text:  {password.strip()}")
    print(f"SHA-256:     {hashed}")
    print()
    print("Copy the SHA-256 hash above and replace PLACEHOLDER_HASH_REPLACE_ME in:")
    print("  src/components/ui/TerminalUI.js  (line ~15, ADMIN_HASH constant)")
    print()
    print(f'const ADMIN_HASH = "{hashed}";')
