def validate_body_in_request(data: dict) -> bool:
    return all(value for value in data.values())
