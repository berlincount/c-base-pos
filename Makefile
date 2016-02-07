REPORTER = spec
test: lint
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha -r should -b --reporter $(REPORTER)

lint:
	./node_modules/.bin/jshint ./lib ./test ./c-base-pos.js

test-cov: test
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--require should \
		--reporter html-cov > coverage.html.new \
	&& cat coverage.html.new > coverage.html \
	&& rm coverage.html.new
	@# avoiding an empty (hardlinked) coverage file between runs

test-cov-coveralls: test
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--require should \
		--reporter mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

test-cov-travis: test-cov-coveralls
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--require should \
		--reporter travis-cov

.PHONY: test
