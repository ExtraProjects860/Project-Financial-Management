import os
from flask import Flask
from flask_cors import CORS
from src.routes.UserRoutes import user_routes
from src.routes.FinancialPaymentsRoutes import financial_payments_routes
from src.routes.FinancialAccountsRoutes import financial_accounts_routes
from src.routes.FinancialPaymentsLogicRoutes import financial_payments_logic_routes
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
CORS(app)

app.register_blueprint(user_routes, url_prefix='/api')
app.register_blueprint(financial_payments_routes, url_prefix='/api')
app.register_blueprint(financial_accounts_routes, url_prefix='/api')
app.register_blueprint(financial_payments_logic_routes, url_prefix='/api')