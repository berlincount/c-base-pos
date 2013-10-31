#!/bin/bash -e

## Datenbank leeren ...
echo \# Cleaning items ...
for i in `seq 1 50`; do curl -S -s -X DELETE -H 'Content-type: application/json' http://hoschi:14339/api/v0/items/$i ; done
echo \# Cleaning prices ...
for i in `seq 1 50`; do curl -S -s -X DELETE -H 'Content-type: application/json' http://hoschi:14339/api/v0/prices/$i ; done
echo \# Cleaning tariffs ...
for i in `seq 1 50`; do curl -S -s -X DELETE -H 'Content-type: application/json' http://hoschi:14339/api/v0/tariffs/$i ; done

## Preise anlegen ...
echo \# Generating prices ...
function price {  echo -n "$1" ; curl -o /dev/null -w '\t\t -> %{http_code}\n' -S -s -X POST -H 'Content-type: application/json' http://hoschi:14339/api/v0/prices -d "$1" ; }
# tschechische Biere
price  '{"id":  1, "displayName": "Ležák 0,5 (Member)",                    "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id":  2, "displayName": "Ležák 0,5 (Alien)",                     "amount": 1, "amount_unit": "Flaschen", "price": 2.50, "price_unit": "EUR"}'
price  '{"id":  3, "displayName": "Granát 0,5 (Member)",                   "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id":  4, "displayName": "Granát 0,5 (Alien)",                    "amount": 1, "amount_unit": "Flaschen", "price": 2.50, "price_unit": "EUR"}'
price  '{"id":  5, "displayName": "Borúvka 0,5 (Member)",                  "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id":  6, "displayName": "Borúvka 0,5 (Alien)",                   "amount": 1, "amount_unit": "Flaschen", "price": 2.50, "price_unit": "EUR"}'
price  '{"id":  7, "displayName": "Kvasar 0,5 (Member)",                   "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id":  8, "displayName": "Kvasar 0,5 (Alien)",                    "amount": 1, "amount_unit": "Flaschen", "price": 2.50, "price_unit": "EUR"}'
# Biere
price  '{"id":  9, "displayName": "Premium-Bier 0,33 (Member)",            "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 10, "displayName": "Premium-Bier 0,33 (Alien)",             "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 11, "displayName": "Berliner Pilsener 0,5 (Member)",        "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 12, "displayName": "Berliner Pilsener 0,5 (Alien)",         "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 13, "displayName": "Franziskaner Hefe hell 0,5 (Member)",   "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 14, "displayName": "Franziskaner Hefe hell 0,5 (Alien)",    "amount": 1, "amount_unit": "Flaschen", "price": 2.50, "price_unit": "EUR"}'
# Alkoholfreie Getränke und Biere
price  '{"id": 15, "displayName": "Club Mate 0,5 (Member)",                "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 16, "displayName": "Club Mate 0,5 (Alien)",                 "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 17, "displayName": "Flora Power 0,5 (Member)",              "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 18, "displayName": "Flora Power 0,5 (Alien)",               "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 19, "displayName": "Premium-Cola 0,5 (Member)",             "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 20, "displayName": "Premium-Cola 0,5 (Alien)",              "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 21, "displayName": "Spezi 0,5 (Member)",                    "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 22, "displayName": "Spezi 0,5 (Alien)",                     "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 23, "displayName": "Wostock Tannenwald 0,5 (Member)",       "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 24, "displayName": "Wostock Tannenwald 0,5 (Alien)",        "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 25, "displayName": "Wostock Ferne Früchte 0,5 (Member)",    "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 26, "displayName": "Wostock Ferne Früchte 0,5 (Alien)",     "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 27, "displayName": "Wostock Grün 0,5 (Member)",             "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 28, "displayName": "Wostock Grün 0,5 (Alien)",              "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 29, "displayName": "Kraftmalz 0,5 (Member)",                "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 30, "displayName": "Kraftmalz 0,5 (Alien)",                 "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 31, "displayName": "Holsten alkoholfrei 0,5 (Member)",      "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 32, "displayName": "Holsten alkoholfrei 0,5 (Alien)",       "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 33, "displayName": "Franziskaner alkoholfrei 0,5 (Member)", "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 34, "displayName": "Franziskaner alkoholfrei 0,5 (Alien)",  "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 35, "displayName": "Wasser mit Sprudel 0,5 (Member)",       "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 36, "displayName": "Wasser mit Sprudel 0,5 (Alien)",        "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 37, "displayName": "Wasser ohne Sprudel 0,5 (Member)",      "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 38, "displayName": "Wasser ohne Sprudel 0,5 (Alien)",       "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
# Narcotica
price  '{"id": 39, "displayName": "Jägermeister 2cl (Member)",             "amount": 1, "amount_unit": "Gläser",   "price": 1.50, "price_unit": "EUR"}'
price  '{"id": 40, "displayName": "Jägermeister 2cl (Alien)",              "amount": 1, "amount_unit": "Gläser",   "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 41, "displayName": "Wodka 2cl (Member)",                    "amount": 1, "amount_unit": "Gläser",   "price": 1.50, "price_unit": "EUR"}'
price  '{"id": 42, "displayName": "Wodka 2cl (Alien)",                     "amount": 1, "amount_unit": "Gläser",   "price": 2.50, "price_unit": "EUR"}'
# Spezielles (nicht ständig im Programm)
price  '{"id": 43, "displayName": "Mier (div. Sorten & Größen) (Member)",  "amount": 1, "amount_unit": "Flaschen", "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 44, "displayName": "Mier (div. Sorten & Größen) (Alien)",   "amount": 1, "amount_unit": "Flaschen", "price": 2.00, "price_unit": "EUR"}'
price  '{"id": 45, "displayName": "Schokoriegel (div. Sorten)",            "amount": 1, "amount_unit": "Stück",    "price": 1.30, "price_unit": "EUR"}'
price  '{"id": 46, "displayName": "Schokoriegel (div. Sorten)",            "amount": 1, "amount_unit": "Stück",    "price": 2.00, "price_unit": "EUR"}'

## Menüseiten generieren ...
echo \# Generating tariffs ...
function tariff {  echo -n "$1" ; curl -o /dev/null -w '\t\t -> %{http_code}\n' -S -s -X POST -H 'Content-type: application/json' http://hoschi:14339/api/v0/tariffs -d "$1" ; }
tariff '{"id":  1, "displayName": "Mixed"}'
#tariff '{"id":  2, "displayName": "Member"}'
#tariff '{"id":  3, "displayName": "Alien"}'
#tariff '{"id":  4, "displayName": "Party"}'

## Menüpunkte zuordnen ...
echo \# Generating items ...
function item {  echo -n "$1" ; curl -o /dev/null -w '\t\t -> %{http_code}\n' -S -s -X POST -H 'Content-type: application/json' http://hoschi:14339/api/v0/items -d "$1" ; }
## Format:
# item '{"id":  X, "displayName": "XXXXXXXXXXX", "tariff_id": X, "price_id": XXX, "meta": "{\"x\":X,\"y\":X,\"col\":X}"}'
# col 0: 'normal', 1: member 2: alien 3: special

# 'Mixed'
# Erste Zeile ...
item   '{"id":  1, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":0,\"y\":0,\"col\":0}"}'
item   '{"id":  2, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":1,\"y\":0,\"col\":0}"}'
item   '{"id":  3, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":2,\"y\":0,\"col\":0}"}'
item   '{"id":  4, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":3,\"y\":0,\"col\":0}"}'
item   '{"id":  5, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":4,\"y\":0,\"col\":0}"}'
# Zweite Zeile ...
item   '{"id":  6, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":0,\"y\":1,\"col\":0}"}'
item   '{"id":  7, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":1,\"y\":1,\"col\":0}"}'
item   '{"id":  8, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":2,\"y\":1,\"col\":0}"}'
item   '{"id":  9, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":3,\"y\":1,\"col\":0}"}'
item   '{"id": 10, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":4,\"y\":1,\"col\":0}"}'
# Dritte Zeile ...
item   '{"id": 11, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":0,\"y\":2,\"col\":0}"}'
item   '{"id": 12, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":1,\"y\":2,\"col\":0}"}'
item   '{"id": 13, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":2,\"y\":2,\"col\":0}"}'
item   '{"id": 14, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":3,\"y\":2,\"col\":0}"}'
item   '{"id": 15, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":4,\"y\":2,\"col\":0}"}'
# Vierte Zeile ...
item   '{"id": 16, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":0,\"y\":3,\"col\":0}"}'
item   '{"id": 17, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":1,\"y\":3,\"col\":0}"}'
item   '{"id": 18, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":2,\"y\":3,\"col\":0}"}'
item   '{"id": 19, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":3,\"y\":3,\"col\":0}"}'
item   '{"id": 20, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":4,\"y\":3,\"col\":0}"}'
# Fünfte Zeile ...
item   '{"id": 21, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":0,\"y\":4,\"col\":0}"}'
item   '{"id": 22, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":1,\"y\":4,\"col\":0}"}'
item   '{"id": 23, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":2,\"y\":4,\"col\":0}"}'
item   '{"id": 24, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":3,\"y\":4,\"col\":0}"}'
item   '{"id": 25, "displayName": "1234567890112345678901", "tariff_id": 1, "price_id":   0, "meta": "{\"x\":4,\"y\":4,\"col\":0}"}'
