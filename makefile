.DEFAULT_GOAL := all

.PHONY: backend

FILES1 :=						\
    tests.py					\
    dbtests.py					\
    .travis.yml

GithubID = RobertHale
RepoName = HikingAdventure
SHA      = f1adb9320de543abecc0a1923e21bb0aa4e411c4

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://www.github.com/${GithubID}/${RepoName}/projects/7"

# make uml      - prints link to uml diagram
uml:
	@echo "http://www.github.com/${GithubID}/${RepoName}/blob/${SHA}/hikingdb.png"

# make website  - prints link to a website
website:
	@echo "http://hikingadventures.me/"

# make report   - prints link to technical report
report:
	@echo "http://${GithubID}.gitbooks.io/report/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "http://${GithubID}.gitbooks.io/api/"

# make self     - prints link to self critique
self:
	@echo "http://${GithubID}.gitbooks.io/report/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "http://${GithubID}.gitbooks.io/report/other-critique.html"

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
	@cd ./tests;	\
	newman run HikingAdventure.postman_collection.json;
	@echo "#################################"

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