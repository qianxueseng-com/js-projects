test: jshint
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec -t 20000 --require should --inline-diffs

coveralls: test
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

debug:
	node $(NODE_DEBUG) ./node_modules/.bin/_mocha -R spec -t 20000 --require should --inline-diffs

jshint:
	@./node_modules/.bin/jshint .

.PHONY: test
