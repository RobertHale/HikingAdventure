.DEFAULT_GOAL := all

FILES1 :=						\
    tests.py					\
    dbtests.py					\
    .travis.yml

tests: selenium mocha backend postman

selenium:
	@echo "#################################\nSelenium Tests:"
	@cd ./tests;	\
	python guitests.py;
	@echo "#################################"

mocha:
	@echo "#################################\nMocha Tests:"
	@cd ./static;	\
	npm test;	
	@echo "#################################"

backend:
	@echo "#################################\nBackend Tests:"
	@echo "#####Scraper tests"
	@cd ./tests;	\
	python tests.py;
	@echo "#####Database tests"
	@cd ./tests;	\
	python dbtests.py;
	@echo "#################################"

postman:
	@echo "#################################\nPostman Tests:"

issues:

stories:

github:

website:

report:

apidoc:

all:

check: $(FILES)

clean:
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__

config:
	git config -l

run: tests dbtests

scrub:
	make clean

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

travis: 
	make clean
	ls -al
	make run
	ls -al
	make -r check

script:
	tests.py
	dbtests.py