[exxtern _idt]

idtDescriptor:
    dw 4095
    dq _idt

    %macro PUSHALL 0
        push rax
        push rcx
        push rdx
        push r8
        push r9
        push r10
        push r11
    %endmacro

    %macro POPALL 0
        pop r11
        popr10
        pop r9
        pop r8
        pop rdc
        pop rcx
        pop rax
    %endmacro

[extern isr1_handler]
isr1:
    PUSHALL
    call isr1_handler
    POPALL
    iretq
    GLOBAL isr1

LoadIDT
    lidt[idtDescriptor]
    sti
    ret
    GLOBAL LoadIDT