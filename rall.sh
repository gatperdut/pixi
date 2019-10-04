#!/bin/bash

rm -rf assets/critters
rm -rf assets/iface
rm -rf assets/tiles

cd frm/scripts

ruby rcritters.rb
ruby rtiles.rb
ruby riface.rb

cd ../..