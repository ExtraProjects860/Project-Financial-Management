from flask import Blueprint, jsonify, request, Response
from src.controller.UserController import UserController

user_routes = Blueprint('user_routes', __name__)

@user_routes.route("/create-user", methods=["POST"])
def create_user() -> tuple[Response, int]:
    try:
        data = request.get_json()
        print(data)
        user_controller = UserController(
            email=data["email"],
            password=data["password"],
            name=data["name"],
            profession=data["profession"],
            monthlyIncome=data["monthlyIncome"],
        )

        user_controller.create_user()

        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Error creating user: " + str(e)}), 500
    

@user_routes.route("/login", methods=["POST"])
def login() -> tuple[Response, int]:
    try:
        data = request.get_json()
        user_controller = UserController(
            email=data["email"],
            password=data["password"],
            name=None,
            profession=None,
            monthlyIncome=None,
        )

        token: str = user_controller.login_user()

        return jsonify({"token": token}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@user_routes.route("/logout", methods=["POST"])
@UserController.login_required
def logout() -> tuple[Response, int]:
    try:
        user: UserController = UserController(
            email=None,
            password=None,
            name=None,
            profession=None,
            monthlyIncome=None,
        )
        
        user.logout_user()

        return jsonify({"message": "User logged out successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@user_routes.route("/update-user", methods=["PUT"])
@UserController.login_required
def update_user() -> tuple[Response, int]:
    try:
        data = request.get_json()
        user_controller = UserController(
            email=data["email"],
            password=None,
            name=data["name"],
            profession=data["profession"],
            monthlyIncome=data["monthlyIncome"],
        )

        user_controller.update_user()

        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@user_routes.route("/reset-password", methods=["POST"])
def reset_password() -> tuple[Response, int]:
    try:
        data = request.get_json()
        user_controller = UserController(
            email=data["email"],
            password=None,
            name=None,
            monthlyIncome=None,
        )

        user_controller.reset_password()

        return jsonify({"message": "Password reset email sent successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500