.DEFAULT_GOAL := all

FILES1 :=						\
    tests.py					\
    dbtests.py					\	
    .travis.yml					\

tests: tests.py

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