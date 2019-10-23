from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content',validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    submit = SubmitField('Post')
    # A sidenote: The author of the post does not need to be known by post