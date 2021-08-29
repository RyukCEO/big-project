nasm src/bootloader.asm -f bin -i src -o bootloader.bin

nasm src/ExtendedProgram.asm -f elf64 -i src -o ExtendedProgram.o

cmake CMakeLists.txt -G "Unix Makefiles" -D CMAKE_CXX_COMPILER=x86_64-elf-gcc -D CMAKE_C_COMPILER=x86_64-elf-gcc

copy /b bootloader.bin+kernel.bin bootloader.flp

pause