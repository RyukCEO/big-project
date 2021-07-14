package com.example.quaxapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.telecom.Call;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


import org.w3c.dom.Text;


public class loginpage extends AppCompatActivity {

    EditText email,password;
    Button loginbutton;
    CheckBox remember;

    boolean isAuth = false;
    private Object CheckBox;

    sharedPreferences preferences = getSharedPreferences("checkbox", MODE_PRIVATE);
    string checkbox = preferennces.getString("remember", "");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loginpage);

        email = findViewById(R.id.editTextTextEmailAddress);
        password = findViewById(R.id.editTextTextPassword);
        CheckBox = findViewById(R.id.remembermecheckbox);
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



                remember.setOnCheckedChangeListener(new CompoundButton.setOnCheckedChangeListener(){
                    @override
                    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                        if(CompoundButton.isChecked()){
                            sharedPreferences preferences = getSharedPreferences("checkbox", MODE_PRIVATE);
                            sharedPreferences.EDITOR editor=preferences.edit();
                            editor.putString("remember", "true");
                            editor.apply();
                        }else if (!CompoundButton.isChecked()){
                            sharedPreferences preferences = getSharedPreferences("checkbox", MODE_PRIVATE);
                            sharedPreferences.EDITOR editor=preferences.edit();
                            editor.putString("remember", "false");
                            editor.apply();
                        }
                    }
                });



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