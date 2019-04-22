package com.bsu.exadel.main;

import com.google.gson.JsonObject;

public class JsonAnswer {
    private JsonAnswer(){}

    public static JsonObject createAnswer(String text){
        JsonObject jsonToReturn = new JsonObject();
        jsonToReturn.addProperty("answer", text);
        return jsonToReturn;
    }

    public static JsonObject createCustom(String key, String value){
        JsonObject jsonToReturn = new JsonObject();
        jsonToReturn.addProperty(key, value);
        return jsonToReturn;
    }

    public static void addCustomLine(JsonObject obj, String key, String value){
        obj.addProperty(key,value);
    }
}
