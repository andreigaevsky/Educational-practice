package com.bsu.exadel.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class ValidatePostHelper {
    private static final int MIN_DESCRIPTION_LEN = 10;
    private static final int MAX_DESCRIPTION_LEN = 200;
    private static final int MAX_TAG_LEN = 20;

    private ValidatePostHelper() {
    }

    public static void checkForDescrLength(String text) throws IllegalArgumentException {
        if (text.length() < MIN_DESCRIPTION_LEN || text.length() > MAX_DESCRIPTION_LEN) {
            throw new IllegalArgumentException();
        }
    }

    public static void checkForTagsLen(List<String> tags)throws IllegalArgumentException {
        tags.forEach((tag) -> {
            if (tag.length() > MAX_TAG_LEN) {
                throw new IllegalArgumentException();
            }
        });
    }

    public static void checkForContent(String link) throws IllegalArgumentException {
        if (link.length() == 0) {
            throw new IllegalArgumentException(link + " - unknown photo link.\n");
        }
    }
}
