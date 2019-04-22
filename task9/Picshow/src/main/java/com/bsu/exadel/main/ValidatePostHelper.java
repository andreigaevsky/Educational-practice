package com.bsu.exadel.main;

import java.util.Arrays;

public final class ValidatePostHelper {
    private static final int MIN_DESCRIPTION_LEN = 10;
    private static final int MAX_DESCRIPTION_LEN = 200;
    private static final int MAX_TAG_LEN = 20;
    private ValidatePostHelper(){
    }
    public static void checkForDescrLength(String text){
        if( text.length() < MIN_DESCRIPTION_LEN || text.length() > MAX_DESCRIPTION_LEN){
            throw new IllegalArgumentException(text+" - has more "+MAX_DESCRIPTION_LEN+" length.\n");
        }
    }

    public static void checkForTagsLen(String tags){
        Arrays.stream(tags.split("[ ,!;]+")).forEach((tag)->{
            if(tag.length() > MAX_TAG_LEN){
                throw new IllegalArgumentException("Check tags");
            }
        });
    }

    public static void checkForContent(String link){
        if( link.length() == 0){
            throw new IllegalArgumentException(link+" - unknown photo link.\n");
        }
    }
}
