arg = $(filter-out $@,$(MAKECMDGOALS))

.PHONY: list help
help::
	@printf "\n"
	@printf "\033[1;33mMakefile\033[0m\n"
	@printf "\033[0;33m\thelp\033[0m - Print help\n"
	@printf "\033[0;33m\tlist\033[0m - Print list of all possible commands\n"

list:
	@$(MAKE) -qp | awk -F':' '/^[a-zA-Z0-9][^$$#\/\t=]*:([^=]|$$)/ {split($$1,A,/ /);for(i in A)print A[i]}' | grep -v Makefile | sort -u

include Makefile.*

%:
	@:
