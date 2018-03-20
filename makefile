.DEFAULT_GOAL := all

FILES1 :=						\
    tests.py					\
    dbtests.py					\	

all:

check: $(FILES)

clean:
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache

config:
	git config -l

run: tests.pyx dbtests.pyx

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