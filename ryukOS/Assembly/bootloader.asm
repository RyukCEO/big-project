
[org 0x7c00]

mov [BOOT_DISK], dl

mov bp, 0x7c00
mov sp, bp

mov bx, welcomestring
call PrintString

call ReadDisk

jmp PROGRAM_SPACE

%include "printstrings.asm"
%include "bootdisk.asm"

times 510-($-$$) db 0

dw 0xaa55