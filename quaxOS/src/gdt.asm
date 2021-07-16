gdt_nulldesc:
     dd0
     dd0

gdt_codedesc:
    dw 0xFFFF           ; Limit
    dw 0x0000           ; base (low)
    db 0x00             ; base (medium)
    db 10011010b        ; flags
    db 11001111b        ; flags + upper Limit
    db 0x00             ; base (high)

gdt_datadesc:
    dw 0xFFFF
    dw 0x0000
    db 0x00
    db 10011010b
    db 11001111b
    db 0x00

gdt_end:

gdt_descriptor:
    gdt_size:
        dw gdt_end - gdt_nulldesc - 1
        dq gdt_nulldesc

codeseg equ gdt_codedest - gdt_nulldesc
dataseg equ gdt_datadesc - gdt_nulldesc
[bits 32]

EditGDT:
    mov [gdt_codedesc + 6], byte 10101111b

    mov [gdt_datadesc + 6], byte 10101111b
    ret

[bits 16]