# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



household1 = Household.create!(name: 'The Smiths')
household2 = Household.create!(name: 'The Carters')

perishables = Category.create!(name: 'Perishables')
kitchen = Category.create!(name: 'Kitchen')
bathroom = Category.create!(name: 'Bathroom and Toiletries')
medicine = Category.create!(name: 'Medicine')
tools = Category.create!(name: 'Tool and Hardware')
office = Category.create!(name: 'Office Supplies')
electronics = Category.create!(name: 'Electronics')
bedroom = Category.create!(name: 'Bedroom')
clean = Category.create!(name: 'Cleaning Supplies')
food = Category.create!(name: 'Food')
misc = Category.create!(name: 'Miscellaneous')

date1 = Date.new(2011, 11, 11)
date2 = Date.new(2015, 2, 10)
date3 = Date.new(2019, 1, 13)
date4 = Date.new(2018, 8, 20)
date5 = Date.new(2018, 3, 14)

will = User.create!(name: 'Will', password: '1234', household: household1)
jada = User.create!(name: 'Jada', password: '1234', household: household1)
willow = User.create!(name: 'Willow', password: '1234', household: household1)
jaden = User.create!(name: 'Jaden', password: '1234', household: household1)
beyonce = User.create!(name: 'Beyonce', password: '1234', household: household2)
jayz = User.create!(name: 'JayZ', password: '1234', household: household2)
blue = User.create!(name: 'Blue', password: '1234', household: household2)
sir = User.create!(name: 'Sir', password: '1234', household: household2)
rumi = User.create!(name: 'Rumi', password: '1234', household: household2)

tp = Item.create!(name: 'Toilet Paper', quantity: 10, frequency: 2, purchase_date: date1, user: will, category: bathroom)
staples = Item.create!(name: 'Staples', quantity: 100, frequency: 10, purchase_date: date2, user: jada, category: misc)
paper = Item.create!(name: 'Paper', quantity: 500, frequency: 5, purchase_date: date3, user: willow, category: misc)
sponges = Item.create!(name: 'Sponges', quantity: 500, frequency: 5, purchase_date: date2, user: jaden, category: bathroom)
tea = Item.create!(name: 'Tea', quantity: 20, frequency: 1, purchase_date: date4, user: blue, category: kitchen)
advil = Item.create!(name: 'Advil', quantity: 100, frequency: 2, purchase_date: date5, user: beyonce, category: medicine)
pencils = Item.create!(name: 'Pencils', quantity: 100, frequency: 2, purchase_date: date4, user: jayz, category: misc)
tylenol = Item.create!(name: 'Tylenol', quantity: 100, frequency: 2, purchase_date: date3, user: rumi, category: medicine)
soap = Item.create!(name: 'Soap', quantity: 100, frequency: 2, purchase_date: date1, user: sir, category: kitchen)











	