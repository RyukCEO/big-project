package com.example.quaxapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.telecom.Call;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


import org.w3c.dom.Text;


public class loginpage extends AppCompatActivity {

    EditText email,password;
    Button loginbutton;

    boolean isAuth = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loginpage);

        email = findViewById(R.id.editTextTextEmailAddress);
        password = findViewById(R.id.editTextTextPassword);

        loginbutton = findViewById(R.id.userloginsubmitinformation);
        loginbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String useremail = email.getText().toString();
                String userpassword = password.getText().toString();
                
                if(useremail.isEmpty() || userpassword.isEmpty()) {
                    Toast.makeText(loginpage.this, "Fill the fourm out", Toast.LENGTH_SHORT).show();
                } else {
                    isAuth = loginuser(useremail, userpassword);

                } if(!isAuth) {
                    Toast.makeText(loginpage.this, "Incorrect login", Toast.LENGTH_SHORT).show();
                }else{
                    Intent MainActivity = new Intent(loginpage.this, MainActivity.class);
                    startActivity(MainActivity);
                }


            }
        });
    }

    private boolean loginuser(String email, String password){
        if(email.equals ("bob")) {
            return true;
        }
        return false;
    };





}