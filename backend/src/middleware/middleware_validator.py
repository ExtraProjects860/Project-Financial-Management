def validate_body_in_request(data: dict) -> bool:
    return filter(lambda x: x != None, data.values())
