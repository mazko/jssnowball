
/* This file was generated automatically by the Snowball to ANSI C compiler */

#include "../runtime/header.h"

#ifdef __cplusplus
extern "C" {
#endif
extern int slovene_UTF_8_stem(struct SN_env * z);
#ifdef __cplusplus
}
#endif
#ifdef __cplusplus
extern "C" {
#endif


extern struct SN_env * slovene_UTF_8_create_env(void);
extern void slovene_UTF_8_close_env(struct SN_env * z);


#ifdef __cplusplus
}
#endif
static const symbol s_0_0[5] = { 'a', 'n', 's', 'k', 'i' };
static const symbol s_0_1[5] = { 'e', 'v', 's', 'k', 'i' };
static const symbol s_0_2[5] = { 'o', 'v', 's', 'k', 'i' };

static const struct among a_0[3] =
{
/*  0 */ { 5, s_0_0, -1, 1, 0},
/*  1 */ { 5, s_0_1, -1, 1, 0},
/*  2 */ { 5, s_0_2, -1, 1, 0}
};

static const symbol s_1_0[4] = { 's', 't', 'v', 'o' };
static const symbol s_1_1[5] = { 0xC5, 0xA1, 't', 'v', 'o' };

static const struct among a_1[2] =
{
/*  0 */ { 4, s_1_0, -1, 1, 0},
/*  1 */ { 5, s_1_1, -1, 1, 0}
};

static const symbol s_2_0[3] = { 'e', 'g', 'a' };
static const symbol s_2_1[3] = { 'i', 'j', 'a' };
static const symbol s_2_2[3] = { 'i', 'l', 'a' };
static const symbol s_2_3[3] = { 'e', 'm', 'a' };
static const symbol s_2_4[3] = { 'v', 'n', 'a' };
static const symbol s_2_5[3] = { 'i', 't', 'e' };
static const symbol s_2_6[3] = { 's', 't', 'e' };
static const symbol s_2_7[5] = { 0xC5, 0xA1, 0xC4, 0x8D, 'e' };
static const symbol s_2_8[3] = { 's', 'k', 'i' };
static const symbol s_2_9[4] = { 0xC5, 0xA1, 'k', 'i' };
static const symbol s_2_10[3] = { 'i', 't', 'i' };
static const symbol s_2_11[3] = { 'o', 'v', 'i' };
static const symbol s_2_12[4] = { 0xC4, 0x8D, 'e', 'k' };
static const symbol s_2_13[3] = { 'o', 'v', 'm' };
static const symbol s_2_14[4] = { 0xC4, 0x8D, 'a', 'n' };
static const symbol s_2_15[3] = { 'l', 'e', 'n' };
static const symbol s_2_16[3] = { 'v', 'e', 'n' };
static const symbol s_2_17[4] = { 0xC5, 0xA1, 'e', 'n' };
static const symbol s_2_18[3] = { 'e', 'j', 'o' };
static const symbol s_2_19[3] = { 'i', 'j', 'o' };
static const symbol s_2_20[3] = { 'a', 's', 't' };
static const symbol s_2_21[3] = { 'o', 's', 't' };

static const struct among a_2[22] =
{
/*  0 */ { 3, s_2_0, -1, 1, 0},
/*  1 */ { 3, s_2_1, -1, 1, 0},
/*  2 */ { 3, s_2_2, -1, 1, 0},
/*  3 */ { 3, s_2_3, -1, 1, 0},
/*  4 */ { 3, s_2_4, -1, 1, 0},
/*  5 */ { 3, s_2_5, -1, 1, 0},
/*  6 */ { 3, s_2_6, -1, 1, 0},
/*  7 */ { 5, s_2_7, -1, 1, 0},
/*  8 */ { 3, s_2_8, -1, 1, 0},
/*  9 */ { 4, s_2_9, -1, 1, 0},
/* 10 */ { 3, s_2_10, -1, 1, 0},
/* 11 */ { 3, s_2_11, -1, 1, 0},
/* 12 */ { 4, s_2_12, -1, 1, 0},
/* 13 */ { 3, s_2_13, -1, 1, 0},
/* 14 */ { 4, s_2_14, -1, 1, 0},
/* 15 */ { 3, s_2_15, -1, 1, 0},
/* 16 */ { 3, s_2_16, -1, 1, 0},
/* 17 */ { 4, s_2_17, -1, 1, 0},
/* 18 */ { 3, s_2_18, -1, 1, 0},
/* 19 */ { 3, s_2_19, -1, 1, 0},
/* 20 */ { 3, s_2_20, -1, 1, 0},
/* 21 */ { 3, s_2_21, -1, 1, 0}
};

static const symbol s_3_0[2] = { 'j', 'a' };
static const symbol s_3_1[2] = { 'k', 'a' };
static const symbol s_3_2[2] = { 'm', 'a' };
static const symbol s_3_3[2] = { 'e', 'c' };
static const symbol s_3_4[2] = { 'j', 'e' };
static const symbol s_3_5[2] = { 'e', 'g' };
static const symbol s_3_6[2] = { 'e', 'h' };
static const symbol s_3_7[2] = { 'i', 'h' };
static const symbol s_3_8[2] = { 'm', 'i' };
static const symbol s_3_9[2] = { 't', 'i' };
static const symbol s_3_10[2] = { 'i', 'j' };
static const symbol s_3_11[2] = { 'a', 'l' };
static const symbol s_3_12[2] = { 'i', 'l' };
static const symbol s_3_13[2] = { 'e', 'm' };
static const symbol s_3_14[2] = { 'o', 'm' };
static const symbol s_3_15[2] = { 'a', 'n' };
static const symbol s_3_16[2] = { 'e', 'n' };
static const symbol s_3_17[2] = { 'i', 'n' };
static const symbol s_3_18[2] = { 'd', 'o' };
static const symbol s_3_19[2] = { 'j', 'o' };
static const symbol s_3_20[2] = { 'i', 'r' };
static const symbol s_3_21[2] = { 'a', 't' };
static const symbol s_3_22[2] = { 'e', 'v' };
static const symbol s_3_23[2] = { 'i', 'v' };
static const symbol s_3_24[2] = { 'o', 'v' };
static const symbol s_3_25[3] = { 'o', 0xC4, 0x8D };

static const struct among a_3[26] =
{
/*  0 */ { 2, s_3_0, -1, 1, 0},
/*  1 */ { 2, s_3_1, -1, 1, 0},
/*  2 */ { 2, s_3_2, -1, 1, 0},
/*  3 */ { 2, s_3_3, -1, 1, 0},
/*  4 */ { 2, s_3_4, -1, 1, 0},
/*  5 */ { 2, s_3_5, -1, 1, 0},
/*  6 */ { 2, s_3_6, -1, 1, 0},
/*  7 */ { 2, s_3_7, -1, 1, 0},
/*  8 */ { 2, s_3_8, -1, 1, 0},
/*  9 */ { 2, s_3_9, -1, 1, 0},
/* 10 */ { 2, s_3_10, -1, 1, 0},
/* 11 */ { 2, s_3_11, -1, 1, 0},
/* 12 */ { 2, s_3_12, -1, 1, 0},
/* 13 */ { 2, s_3_13, -1, 1, 0},
/* 14 */ { 2, s_3_14, -1, 1, 0},
/* 15 */ { 2, s_3_15, -1, 1, 0},
/* 16 */ { 2, s_3_16, -1, 1, 0},
/* 17 */ { 2, s_3_17, -1, 1, 0},
/* 18 */ { 2, s_3_18, -1, 1, 0},
/* 19 */ { 2, s_3_19, -1, 1, 0},
/* 20 */ { 2, s_3_20, -1, 1, 0},
/* 21 */ { 2, s_3_21, -1, 1, 0},
/* 22 */ { 2, s_3_22, -1, 1, 0},
/* 23 */ { 2, s_3_23, -1, 1, 0},
/* 24 */ { 2, s_3_24, -1, 1, 0},
/* 25 */ { 3, s_3_25, -1, 1, 0}
};

static const symbol s_4_0[1] = { 'a' };
static const symbol s_4_1[1] = { 'c' };
static const symbol s_4_2[1] = { 'e' };
static const symbol s_4_3[1] = { 'i' };
static const symbol s_4_4[1] = { 'm' };
static const symbol s_4_5[1] = { 'o' };
static const symbol s_4_6[1] = { 'u' };
static const symbol s_4_7[2] = { 0xC5, 0xA1 };

static const struct among a_4[8] =
{
/*  0 */ { 1, s_4_0, -1, 1, 0},
/*  1 */ { 1, s_4_1, -1, 1, 0},
/*  2 */ { 1, s_4_2, -1, 1, 0},
/*  3 */ { 1, s_4_3, -1, 1, 0},
/*  4 */ { 1, s_4_4, -1, 1, 0},
/*  5 */ { 1, s_4_5, -1, 1, 0},
/*  6 */ { 1, s_4_6, -1, 1, 0},
/*  7 */ { 2, s_4_7, -1, 1, 0}
};

static const symbol s_5_0[1] = { 'a' };
static const symbol s_5_1[1] = { 'e' };
static const symbol s_5_2[1] = { 'i' };
static const symbol s_5_3[1] = { 'o' };
static const symbol s_5_4[1] = { 'u' };

static const struct among a_5[5] =
{
/*  0 */ { 1, s_5_0, -1, 1, 0},
/*  1 */ { 1, s_5_1, -1, 1, 0},
/*  2 */ { 1, s_5_2, -1, 1, 0},
/*  3 */ { 1, s_5_3, -1, 1, 0},
/*  4 */ { 1, s_5_4, -1, 1, 0}
};

static const unsigned char g_crke[] = { 255, 255, 62, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 32 };

static const unsigned char g_samoglasniki[] = { 17, 65, 16 };

static const unsigned char g_soglasniki[] = { 119, 95, 23, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 16 };


extern int slovene_UTF_8_stem(struct SN_env * z) {
    int among_var;
    z->I[0] = z->l;
    z->lb = z->c; z->c = z->l; /* backwards, line 30 */

    {   int m1 = z->l - z->c; (void)m1; /* do, line 31 */
        {   int i; for (i = 4; i > 0; i--) /* loop, line 31 */
            {                   {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 32 */
                    if (!(z->I[0] > 8)) { z->c = z->l - m_keep; goto lab1; }
                    z->ket = z->c; /* [, line 33 */
                    if (z->c - 4 <= z->lb || z->p[z->c - 1] != 105) { z->c = z->l - m_keep; goto lab1; }
                    among_var = find_among_b(z, a_0, 3); /* substring, line 33 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab1; }
                    z->bra = z->c; /* ], line 33 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab1; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 33 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab1:
                    ;
                }
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 35 */
                    if (!(z->I[0] > 7)) { z->c = z->l - m_keep; goto lab2; }
                    z->ket = z->c; /* [, line 36 */
                    if (z->c - 3 <= z->lb || z->p[z->c - 1] != 111) { z->c = z->l - m_keep; goto lab2; }
                    among_var = find_among_b(z, a_1, 2); /* substring, line 36 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab2; }
                    z->bra = z->c; /* ], line 36 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab2; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 36 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab2:
                    ;
                }
                z->I[0] = SIZE(z->p);
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 39 */
                    if (!(z->I[0] > 6)) { z->c = z->l - m_keep; goto lab3; }
                    z->ket = z->c; /* [, line 40 */
                    if (z->c - 2 <= z->lb || z->p[z->c - 1] >> 5 != 3 || !((1108514 >> (z->p[z->c - 1] & 0x1f)) & 1)) { z->c = z->l - m_keep; goto lab3; }
                    among_var = find_among_b(z, a_2, 22); /* substring, line 40 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab3; }
                    z->bra = z->c; /* ], line 40 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab3; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 43 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab3:
                    ;
                }
                z->I[0] = SIZE(z->p);
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 46 */
                    if (!(z->I[0] > 6)) { z->c = z->l - m_keep; goto lab4; }
                    z->ket = z->c; /* [, line 47 */
                    among_var = find_among_b(z, a_3, 26); /* substring, line 47 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab4; }
                    z->bra = z->c; /* ], line 47 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab4; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 50 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab4:
                    ;
                }
                z->I[0] = SIZE(z->p);
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 53 */
                    if (!(z->I[0] > 5)) { z->c = z->l - m_keep; goto lab5; }
                    z->ket = z->c; /* [, line 54 */
                    among_var = find_among_b(z, a_4, 8); /* substring, line 54 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab5; }
                    z->bra = z->c; /* ], line 54 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab5; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 55 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab5:
                    ;
                }
                z->I[0] = SIZE(z->p);
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 58 */
                    if (!(z->I[0] > 6)) { z->c = z->l - m_keep; goto lab6; }
                    z->ket = z->c; /* [, line 59 */
                    if (in_grouping_b_U(z, g_soglasniki, 98, 382, 0)) { z->c = z->l - m_keep; goto lab6; }
                    z->bra = z->c; /* ], line 59 */
                    {   int m_test = z->l - z->c; /* test, line 59 */
                        if (in_grouping_b_U(z, g_soglasniki, 98, 382, 0)) { z->c = z->l - m_keep; goto lab6; }
                        z->c = z->l - m_test;
                    }
                    {   int ret = slice_del(z); /* delete, line 59 */
                        if (ret < 0) return ret;
                    }
                lab6:
                    ;
                }
                z->I[0] = SIZE(z->p);
                {   int m_keep = z->l - z->c;/* (void) m_keep;*/ /* try, line 63 */
                    if (!(z->I[0] > 5)) { z->c = z->l - m_keep; goto lab7; }
                    z->ket = z->c; /* [, line 64 */
                    if (z->c <= z->lb || z->p[z->c - 1] >> 5 != 3 || !((2130466 >> (z->p[z->c - 1] & 0x1f)) & 1)) { z->c = z->l - m_keep; goto lab7; }
                    among_var = find_among_b(z, a_5, 5); /* substring, line 64 */
                    if (!(among_var)) { z->c = z->l - m_keep; goto lab7; }
                    z->bra = z->c; /* ], line 64 */
                    switch(among_var) {
                        case 0: { z->c = z->l - m_keep; goto lab7; }
                        case 1:
                            {   int ret = slice_del(z); /* delete, line 64 */
                                if (ret < 0) return ret;
                            }
                            break;
                    }
                lab7:
                    ;
                }
            }
        }
        z->c = z->l - m1;
    }
    z->c = z->lb;
    return 1;
}

extern struct SN_env * slovene_UTF_8_create_env(void) { return SN_create_env(0, 1, 0); }

extern void slovene_UTF_8_close_env(struct SN_env * z) { SN_close_env(z, 0); }

