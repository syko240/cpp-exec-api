#!/bin/bash

send_code() {
    local code=$1
    local json=$(printf '{"code": "%s"}' "$code")
    echo "Testing code: $code"
    curl -X POST http://localhost/execute \
        -H "Content-Type: application/json" \
        -d "$json"
    echo -e "\n"
}

send_code "#include <cstdlib>\\nint main() { system(\\\"ls\\\"); return 0; }"
send_code "#include <cstring>\\nint main() { char dest[10]; strcpy(dest, \\\"This is a long string\\\"); return 0; }"
send_code "int main() { char buffer[100]; gets(buffer); return 0; }"
send_code "#include <cstring>\\nint main() { char buf[10]; strcat(buf, \\\"Too long string\\\"); return 0; }"
send_code "int main() { char buffer[100]; scanf(\\\"%s\\\", buffer); return 0; }"
send_code "#include <cstdio>\\nint main() { FILE* fp = fopen(\\\"nonexistentfile.txt\\\", \\\"r\\\"); return 0; }"
send_code "#include <sys/stat.h>\\nint main() { chmod(\\\"testfile.txt\\\", 0777); return 0; }"
send_code "#include <stdlib.h>\\n#include <limits.h>\\nint main() { char resolved_path[PATH_MAX]; realpath(\\\"testfile.txt\\\", resolved_path); return 0; }"
send_code "#include <cstdio>\\nint main() { char* tmpname = tmpnam(NULL); return 0; }"
send_code "#include <stdlib.h>\\nint main() { char template[] = \\\"/tmp/tmpfileXXXXXX\\\"; mktemp(template); return 0; }"
send_code "#include <sys/types.h>\\n#include <pwd.h>\\nint main() { struct passwd *pw; pw = getpwuid(getuid()); return 0; }"
send_code "#include <unistd.h>\\nint main() { fork(); return 0; }"
send_code "#include <unistd.h>\\nint main() { execl(\\\"/bin/ls\\\", \\\"ls\\\", (char *)0); return 0; }"
send_code "#include <cstdio>\\nint main() { FILE *fp = popen(\\\"ls\\\", \\\"r\\\"); return 0; }"
send_code "#include <csignal>\\nint main() { signal(SIGINT, SIG_IGN); return 0; }"

send_code "int main() { while(true) {}; return 0; }"
send_code "int main() { for(;;) {}; return 0; }"
send_code "#include <cstdlib>\\nint main() { void* ptr = malloc(10000000); free(ptr); return 0; }"
send_code "int main() { char* arr = new char[10000000]; delete[] arr; return 0; }"
send_code "#include <thread>\\nvoid do_nothing() {}\\nint main() { std::thread t(do_nothing); t.join(); return 0; }"
send_code "#include <future>\\nint main() { auto fut = std::async(std::launch::async, []{ return 42; }); fut.get(); return 0; }"