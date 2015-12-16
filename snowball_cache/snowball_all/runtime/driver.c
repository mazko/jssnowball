
#include <stdio.h>
#include <stdlib.h> /* for malloc, free */
#include <string.h> /* for memmove */

#include "api.h"
#include "hungarian.h"


/* This derives from the source file driver.template */

/* A simple driver for a single ANSI C generated Hungarian stemmer.

   Following compilation with

       gcc -o H_prog q/*.c

   The command line syntax is

       ./H_prog file [-o[utput] file] -h[elp]]

   The first argument gives the input file, which consists of a list of words
   to be stemmed, one per line. (Words must be in lower case.) If omitted, stdin
   is used.

   The output is sent to stdout by default, otherwise to the -output file.

*/

static void stem_file(struct SN_env * z, FILE * f_in, FILE * f_out) {
#define INC 10
    int lim = INC;
    symbol * b = (symbol *) malloc(lim * sizeof(symbol));

    while(1) {
        int ch = getc(f_in);
        if (ch == EOF) {
            free(b); return;
        }
        {
            int i = 0;
            while(1) {
                if (ch == '\n' || ch == EOF) break;
                if (i == lim) {  /* make b bigger */
                    symbol * q = (symbol *) malloc((lim + INC) * sizeof(symbol));
                    memmove(q, b, lim * sizeof(symbol));
                    free(b); b = q;
                    lim = lim + INC;
                }
                b[i] = ch; i++;
                ch = getc(f_in);
            }

            SN_set_current(z, i, b);
            H_stem(z);
            {
                int j;
                for (j = 0; j < z->l; j++) fprintf(f_out, "%c", z->p[j]);
                fprintf(f_out, "\n");
            }
        }
    }
}

static int eq(char * s1, char * s2) {
    int s1_len = strlen(s1);
    int s2_len = strlen(s2);
    return s1_len == s2_len && memcmp(s1, s2, s1_len) == 0;
}

static void show_options(int n) {
    printf("options are: file [-o[utput] file] [-h[elp]]\n");
    exit(n);
}

int main(int argc, char * argv[])
{   char * in = 0;
    char * out = 0;
    {   char * s;
        int i = 1;
        while(1) {
            if (i >= argc) break;
            s = argv[i++];
            if (s[0] == '-') {
                if (eq(s, "-output") || eq(s, "-o")) {
                    if (i >= argc) {
                        fprintf(stderr, "%s requires an argument\n", s);
                        exit(1);
                    }
                    out = argv[i++];
                } else if (eq(s, "-help") || eq(s, "-h")) {
                    show_options(0);
                } else {
                    fprintf(stderr, "%s unknown\n", s);
                    show_options(1);
                }
            }
            else in = s;
        }
    }

    /* initialise the stemming process: */

    {
        struct SN_env * z = H_create_env();
        FILE * f_in;
        FILE * f_out;
        f_in = in == 0 ? stdin : fopen(in, "r");
        if (f_in == 0) {
            fprintf(stderr, "file %s not found\n", in); exit(1);
        }
        f_out = out == 0 ? stdout : fopen(out, "w");
        if (f_out == 0) {
            fprintf(stderr, "file %s cannot be opened\n", out); exit(1);
        }
        stem_file(z, f_in, f_out);
        H_close_env(z);
    }

    return 0;
}

