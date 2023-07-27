#!/usr/bin/python3
"""UTF-8 Validation"""


def validUTF8(data):
    """
    Method that determines if a given data set represents a valid
    UTF-8 encoding.
    """
    num_bytes_to_check = 0

    mask_1 = 1 << 7
    mask_2 = 1 << 6

    for byte in data:
        mask_byte = 1 << 7

        if num_bytes_to_check == 0:
            while mask_byte & byte:
                num_bytes_to_check += 1
                mask_byte >>= 1

            if num_bytes_to_check == 0:
                continue

            if num_bytes_to_check == 1 or num_bytes_to_check > 4:
                return False

        else:
            if not (byte & mask_1 and not (byte & mask_2)):
                return False

        num_bytes_to_check -= 1

    return num_bytes_to_check == 0