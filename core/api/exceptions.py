from rest_framework.exceptions import APIException
from rest_framework import status


class Conflict(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Conflict Request'


class NotFound(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = 'Not found Request'
