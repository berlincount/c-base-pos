#!/usr/bin/env python

import json
import os
import flask
import flask.ext.sqlalchemy
import flask.ext.restless
from OpenSSL import SSL

app = flask.Flask('testbackend')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///testdata.db'

db = flask.ext.sqlalchemy.SQLAlchemy(app)

class Item(db.Model):
  __tablename__ = 'items'
  extend_existing = True
  id          = db.Column('item_id',      db.Integer, primary_key=True)
  displayName = db.Column('dn',           db.String(80))
  tariff_id   = db.Column(db.Integer,     db.ForeignKey('tariffs.tariff_id'))
  price_id    = db.Column(db.Integer,     db.ForeignKey('prices.price_id'))
  meta        = db.Column('meta',         db.Text)

items = db.Table('items',
  db.Column('tariff_id',    db.Integer,     db.ForeignKey('tariffs.tariff_id')),
  db.Column('price_id',     db.Integer,     db.ForeignKey('prices.price_id')),
  extend_existing = True
)

class Tariff(db.Model):
  __tablename__ = 'tariffs'
  id          = db.Column('tariff_id',    db.Integer, primary_key=True)
  displayName = db.Column('dn',           db.String(80))
  meta        = db.Column('meta',         db.Text)
  prices      = db.relationship('Price', secondary=items, backref=db.backref('tariffs', lazy='dynamic'))
  items       = db.relationship('Item')

class Price(db.Model):
  __tablename__ = 'prices'
  id          = db.Column('price_id',     db.Integer, primary_key=True)
  displayName = db.Column('dn',           db.String(80))
  amount      = db.Column('amount',       db.Float)
  amount_unit = db.Column('amount_unit',  db.String(12))
  price       = db.Column('price',        db.Float)
  price_unit  = db.Column('price_unit',   db.String(12))
  meta        = db.Column('meta',         db.Text)

db.create_all()

manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(Tariff, methods=['GET', 'POST', 'PUT', 'DELETE'], url_prefix='/api/v0')
manager.create_api(Item,   methods=['GET', 'POST', 'PUT', 'DELETE'], url_prefix='/api/v0')
manager.create_api(Price,  methods=['GET', 'POST', 'PUT', 'DELETE'], url_prefix='/api/v0')

app.run(host='0.0.0.0', port=14339, debug=True, use_evalex=False)
