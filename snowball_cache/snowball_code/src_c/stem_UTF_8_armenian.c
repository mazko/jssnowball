
/* This file was generated automatically by the Snowball to ANSI C compiler */

#include "../runtime/header.h"

#ifdef __cplusplus
extern "C" {
#endif
extern int armenian_UTF_8_stem(struct SN_env * z);
#ifdef __cplusplus
}
#endif
static int r_ending(struct SN_env * z);
static int r_noun(struct SN_env * z);
static int r_verb(struct SN_env * z);
static int r_adjective(struct SN_env * z);
static int r_R2(struct SN_env * z);
static int r_mark_regions(struct SN_env * z);
#ifdef __cplusplus
extern "C" {
#endif


extern struct SN_env * armenian_UTF_8_create_env(void);
extern void armenian_UTF_8_close_env(struct SN_env * z);


#ifdef __cplusplus
}
#endif
static const symbol s_0_0[6] = { 0xD5, 0xA2, 0xD5, 0xA1, 0xD6, 0x80 };
static const symbol s_0_1[8] = { 0xD6, 0x80, 0xD5, 0xB8, 0xD6, 0x80, 0xD5, 0xA4 };
static const symbol s_0_2[10] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB8, 0xD6, 0x80, 0xD5, 0xA4 };
static const symbol s_0_3[6] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xAB };
static const symbol s_0_4[6] = { 0xD5, 0xA1, 0xD5, 0xAF, 0xD5, 0xAB };
static const symbol s_0_5[8] = { 0xD5, 0xB8, 0xD6, 0x80, 0xD5, 0xA1, 0xD5, 0xAF };
static const symbol s_0_6[4] = { 0xD5, 0xA5, 0xD5, 0xB2 };
static const symbol s_0_7[8] = { 0xD5, 0xBE, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6 };
static const symbol s_0_8[8] = { 0xD5, 0xA1, 0xD6, 0x80, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_0_9[8] = { 0xD5, 0xA1, 0xD5, 0xAF, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_0_10[4] = { 0xD5, 0xA5, 0xD5, 0xB6 };
static const symbol s_0_11[8] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xA5, 0xD5, 0xB6 };
static const symbol s_0_12[8] = { 0xD5, 0xA5, 0xD5, 0xAF, 0xD5, 0xA5, 0xD5, 0xB6 };
static const symbol s_0_13[8] = { 0xD5, 0xB8, 0xD6, 0x80, 0xD5, 0xA7, 0xD5, 0xB6 };
static const symbol s_0_14[4] = { 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_0_15[6] = { 0xD5, 0xA3, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_0_16[8] = { 0xD5, 0xB8, 0xD5, 0xBE, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_0_17[8] = { 0xD5, 0xAC, 0xD5, 0xA1, 0xD5, 0xB5, 0xD5, 0xB6 };
static const symbol s_0_18[6] = { 0xD5, 0xBA, 0xD5, 0xA5, 0xD5, 0xBD };
static const symbol s_0_19[4] = { 0xD5, 0xAB, 0xD5, 0xBE };
static const symbol s_0_20[4] = { 0xD5, 0xA1, 0xD5, 0xBF };
static const symbol s_0_21[8] = { 0xD5, 0xA1, 0xD5, 0xBE, 0xD5, 0xA5, 0xD5, 0xBF };
static const symbol s_0_22[6] = { 0xD5, 0xAF, 0xD5, 0xB8, 0xD5, 0xBF };

static const struct among a_0[23] =
{
/*  0 */ { 6, s_0_0, -1, 1, 0},
/*  1 */ { 8, s_0_1, -1, 1, 0},
/*  2 */ { 10, s_0_2, 1, 1, 0},
/*  3 */ { 6, s_0_3, -1, 1, 0},
/*  4 */ { 6, s_0_4, -1, 1, 0},
/*  5 */ { 8, s_0_5, -1, 1, 0},
/*  6 */ { 4, s_0_6, -1, 1, 0},
/*  7 */ { 8, s_0_7, -1, 1, 0},
/*  8 */ { 8, s_0_8, -1, 1, 0},
/*  9 */ { 8, s_0_9, -1, 1, 0},
/* 10 */ { 4, s_0_10, -1, 1, 0},
/* 11 */ { 8, s_0_11, 10, 1, 0},
/* 12 */ { 8, s_0_12, 10, 1, 0},
/* 13 */ { 8, s_0_13, -1, 1, 0},
/* 14 */ { 4, s_0_14, -1, 1, 0},
/* 15 */ { 6, s_0_15, 14, 1, 0},
/* 16 */ { 8, s_0_16, 14, 1, 0},
/* 17 */ { 8, s_0_17, -1, 1, 0},
/* 18 */ { 6, s_0_18, -1, 1, 0},
/* 19 */ { 4, s_0_19, -1, 1, 0},
/* 20 */ { 4, s_0_20, -1, 1, 0},
/* 21 */ { 8, s_0_21, -1, 1, 0},
/* 22 */ { 6, s_0_22, -1, 1, 0}
};

static const symbol s_1_0[4] = { 0xD5, 0xA1, 0xD6, 0x80 };
static const symbol s_1_1[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1, 0xD6, 0x80 };
static const symbol s_1_2[8] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xA1, 0xD6, 0x80 };
static const symbol s_1_3[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xAB, 0xD6, 0x80 };
static const symbol s_1_4[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x80 };
static const symbol s_1_5[8] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x80 };
static const symbol s_1_6[10] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x80 };
static const symbol s_1_7[10] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xB8, 0xD6, 0x82, 0xD6, 0x81 };
static const symbol s_1_8[10] = { 0xD5, 0xA5, 0xD5, 0xAC, 0xD5, 0xB8, 0xD6, 0x82, 0xD6, 0x81 };
static const symbol s_1_9[4] = { 0xD5, 0xA1, 0xD6, 0x81 };
static const symbol s_1_10[4] = { 0xD5, 0xA5, 0xD6, 0x81 };
static const symbol s_1_11[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xA5, 0xD6, 0x81 };
static const symbol s_1_12[8] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xB8, 0xD6, 0x82 };
static const symbol s_1_13[8] = { 0xD5, 0xA5, 0xD5, 0xAC, 0xD5, 0xB8, 0xD6, 0x82 };
static const symbol s_1_14[4] = { 0xD5, 0xA1, 0xD6, 0x84 };
static const symbol s_1_15[6] = { 0xD6, 0x81, 0xD5, 0xA1, 0xD6, 0x84 };
static const symbol s_1_16[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1, 0xD6, 0x84 };
static const symbol s_1_17[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_1_18[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_1_19[8] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_1_20[10] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_1_21[6] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_22[8] = { 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_23[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_24[12] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xAB, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_25[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_26[10] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_27[12] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_1_28[2] = { 0xD5, 0xA1 };
static const symbol s_1_29[6] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1 };
static const symbol s_1_30[6] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xA1 };
static const symbol s_1_31[4] = { 0xD5, 0xBE, 0xD5, 0xA5 };
static const symbol s_1_32[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xAB };
static const symbol s_1_33[6] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xAB };
static const symbol s_1_34[6] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB };
static const symbol s_1_35[8] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB };
static const symbol s_1_36[4] = { 0xD5, 0xA1, 0xD5, 0xAC };
static const symbol s_1_37[6] = { 0xD5, 0xA8, 0xD5, 0xA1, 0xD5, 0xAC };
static const symbol s_1_38[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xB6, 0xD5, 0xA1, 0xD5, 0xAC };
static const symbol s_1_39[8] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA1, 0xD5, 0xAC };
static const symbol s_1_40[8] = { 0xD5, 0xA5, 0xD5, 0xB6, 0xD5, 0xA1, 0xD5, 0xAC };
static const symbol s_1_41[4] = { 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_42[6] = { 0xD5, 0xA8, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_43[6] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_44[8] = { 0xD6, 0x81, 0xD5, 0xB6, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_45[10] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xB6, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_46[6] = { 0xD5, 0xB9, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_47[6] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_48[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xBE, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_49[10] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xBE, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_50[6] = { 0xD5, 0xBF, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_51[8] = { 0xD5, 0xA1, 0xD5, 0xBF, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_52[8] = { 0xD5, 0xB8, 0xD5, 0xBF, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_53[10] = { 0xD5, 0xAF, 0xD5, 0xB8, 0xD5, 0xBF, 0xD5, 0xA5, 0xD5, 0xAC };
static const symbol s_1_54[6] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xAE };
static const symbol s_1_55[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB4 };
static const symbol s_1_56[8] = { 0xD5, 0xBE, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB4 };
static const symbol s_1_57[4] = { 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_1_58[6] = { 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_1_59[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_1_60[10] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD6, 0x80, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_1_61[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_1_62[8] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_1_63[10] = { 0xD5, 0xBE, 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_1_64[8] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xAB, 0xD5, 0xBD };
static const symbol s_1_65[8] = { 0xD5, 0xA5, 0xD5, 0xAC, 0xD5, 0xAB, 0xD5, 0xBD };
static const symbol s_1_66[4] = { 0xD5, 0xA1, 0xD5, 0xBE };
static const symbol s_1_67[8] = { 0xD5, 0xA1, 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xBE };
static const symbol s_1_68[8] = { 0xD5, 0xA5, 0xD6, 0x81, 0xD5, 0xA1, 0xD5, 0xBE };
static const symbol s_1_69[8] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xB8, 0xD5, 0xBE };
static const symbol s_1_70[8] = { 0xD5, 0xA5, 0xD5, 0xAC, 0xD5, 0xB8, 0xD5, 0xBE };

static const struct among a_1[71] =
{
/*  0 */ { 4, s_1_0, -1, 1, 0},
/*  1 */ { 8, s_1_1, 0, 1, 0},
/*  2 */ { 8, s_1_2, 0, 1, 0},
/*  3 */ { 10, s_1_3, -1, 1, 0},
/*  4 */ { 8, s_1_4, -1, 1, 0},
/*  5 */ { 8, s_1_5, -1, 1, 0},
/*  6 */ { 10, s_1_6, 5, 1, 0},
/*  7 */ { 10, s_1_7, -1, 1, 0},
/*  8 */ { 10, s_1_8, -1, 1, 0},
/*  9 */ { 4, s_1_9, -1, 1, 0},
/* 10 */ { 4, s_1_10, -1, 1, 0},
/* 11 */ { 10, s_1_11, 10, 1, 0},
/* 12 */ { 8, s_1_12, -1, 1, 0},
/* 13 */ { 8, s_1_13, -1, 1, 0},
/* 14 */ { 4, s_1_14, -1, 1, 0},
/* 15 */ { 6, s_1_15, 14, 1, 0},
/* 16 */ { 8, s_1_16, 15, 1, 0},
/* 17 */ { 10, s_1_17, -1, 1, 0},
/* 18 */ { 8, s_1_18, -1, 1, 0},
/* 19 */ { 8, s_1_19, -1, 1, 0},
/* 20 */ { 10, s_1_20, 19, 1, 0},
/* 21 */ { 6, s_1_21, -1, 1, 0},
/* 22 */ { 8, s_1_22, 21, 1, 0},
/* 23 */ { 10, s_1_23, 22, 1, 0},
/* 24 */ { 12, s_1_24, -1, 1, 0},
/* 25 */ { 10, s_1_25, -1, 1, 0},
/* 26 */ { 10, s_1_26, -1, 1, 0},
/* 27 */ { 12, s_1_27, 26, 1, 0},
/* 28 */ { 2, s_1_28, -1, 1, 0},
/* 29 */ { 6, s_1_29, 28, 1, 0},
/* 30 */ { 6, s_1_30, 28, 1, 0},
/* 31 */ { 4, s_1_31, -1, 1, 0},
/* 32 */ { 8, s_1_32, -1, 1, 0},
/* 33 */ { 6, s_1_33, -1, 1, 0},
/* 34 */ { 6, s_1_34, -1, 1, 0},
/* 35 */ { 8, s_1_35, 34, 1, 0},
/* 36 */ { 4, s_1_36, -1, 1, 0},
/* 37 */ { 6, s_1_37, 36, 1, 0},
/* 38 */ { 10, s_1_38, 36, 1, 0},
/* 39 */ { 8, s_1_39, 36, 1, 0},
/* 40 */ { 8, s_1_40, 36, 1, 0},
/* 41 */ { 4, s_1_41, -1, 1, 0},
/* 42 */ { 6, s_1_42, 41, 1, 0},
/* 43 */ { 6, s_1_43, 41, 1, 0},
/* 44 */ { 8, s_1_44, 43, 1, 0},
/* 45 */ { 10, s_1_45, 44, 1, 0},
/* 46 */ { 6, s_1_46, 41, 1, 0},
/* 47 */ { 6, s_1_47, 41, 1, 0},
/* 48 */ { 10, s_1_48, 47, 1, 0},
/* 49 */ { 10, s_1_49, 47, 1, 0},
/* 50 */ { 6, s_1_50, 41, 1, 0},
/* 51 */ { 8, s_1_51, 50, 1, 0},
/* 52 */ { 8, s_1_52, 50, 1, 0},
/* 53 */ { 10, s_1_53, 52, 1, 0},
/* 54 */ { 6, s_1_54, -1, 1, 0},
/* 55 */ { 6, s_1_55, -1, 1, 0},
/* 56 */ { 8, s_1_56, 55, 1, 0},
/* 57 */ { 4, s_1_57, -1, 1, 0},
/* 58 */ { 6, s_1_58, 57, 1, 0},
/* 59 */ { 8, s_1_59, 58, 1, 0},
/* 60 */ { 10, s_1_60, -1, 1, 0},
/* 61 */ { 8, s_1_61, -1, 1, 0},
/* 62 */ { 8, s_1_62, -1, 1, 0},
/* 63 */ { 10, s_1_63, 62, 1, 0},
/* 64 */ { 8, s_1_64, -1, 1, 0},
/* 65 */ { 8, s_1_65, -1, 1, 0},
/* 66 */ { 4, s_1_66, -1, 1, 0},
/* 67 */ { 8, s_1_67, 66, 1, 0},
/* 68 */ { 8, s_1_68, 66, 1, 0},
/* 69 */ { 8, s_1_69, -1, 1, 0},
/* 70 */ { 8, s_1_70, -1, 1, 0}
};

static const symbol s_2_0[6] = { 0xD5, 0xA3, 0xD5, 0xA1, 0xD6, 0x80 };
static const symbol s_2_1[6] = { 0xD5, 0xBE, 0xD5, 0xB8, 0xD6, 0x80 };
static const symbol s_2_2[8] = { 0xD5, 0xA1, 0xD5, 0xBE, 0xD5, 0xB8, 0xD6, 0x80 };
static const symbol s_2_3[8] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD6, 0x85, 0xD6, 0x81 };
static const symbol s_2_4[4] = { 0xD5, 0xB8, 0xD6, 0x81 };
static const symbol s_2_5[4] = { 0xD5, 0xB8, 0xD6, 0x82 };
static const symbol s_2_6[2] = { 0xD6, 0x84 };
static const symbol s_2_7[6] = { 0xD5, 0xA1, 0xD6, 0x80, 0xD6, 0x84 };
static const symbol s_2_8[6] = { 0xD5, 0xB9, 0xD5, 0xA5, 0xD6, 0x84 };
static const symbol s_2_9[4] = { 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_2_10[8] = { 0xD5, 0xA1, 0xD5, 0xAC, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_2_11[8] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xAB, 0xD6, 0x84 };
static const symbol s_2_12[8] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xAE, 0xD6, 0x84 };
static const symbol s_2_13[8] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB5, 0xD6, 0x84 };
static const symbol s_2_14[8] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_2_15[10] = { 0xD5, 0xB4, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_2_16[6] = { 0xD5, 0xA5, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_2_17[6] = { 0xD5, 0xB8, 0xD5, 0xB6, 0xD6, 0x84 };
static const symbol s_2_18[6] = { 0xD5, 0xAB, 0xD5, 0xB9, 0xD6, 0x84 };
static const symbol s_2_19[6] = { 0xD5, 0xB8, 0xD6, 0x80, 0xD5, 0xA4 };
static const symbol s_2_20[8] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB5, 0xD5, 0xA9 };
static const symbol s_2_21[4] = { 0xD6, 0x81, 0xD5, 0xAB };
static const symbol s_2_22[8] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB0, 0xD5, 0xAB };
static const symbol s_2_23[4] = { 0xD5, 0xAB, 0xD5, 0xAC };
static const symbol s_2_24[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xAF };
static const symbol s_2_25[4] = { 0xD5, 0xA1, 0xD5, 0xAF };
static const symbol s_2_26[6] = { 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xAF };
static const symbol s_2_27[8] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA1, 0xD5, 0xAF };
static const symbol s_2_28[4] = { 0xD5, 0xAB, 0xD5, 0xAF };
static const symbol s_2_29[8] = { 0xD5, 0xB5, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6 };
static const symbol s_2_30[14] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6 };
static const symbol s_2_31[4] = { 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_2_32[8] = { 0xD5, 0xA1, 0xD6, 0x80, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_2_33[6] = { 0xD5, 0xBA, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_2_34[8] = { 0xD5, 0xBD, 0xD5, 0xBF, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_2_35[8] = { 0xD5, 0xA5, 0xD5, 0xB2, 0xD5, 0xA7, 0xD5, 0xB6 };
static const symbol s_2_36[6] = { 0xD5, 0xA1, 0xD5, 0xAE, 0xD5, 0xB8 };
static const symbol s_2_37[4] = { 0xD5, 0xAB, 0xD5, 0xB9 };
static const symbol s_2_38[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xBD };
static const symbol s_2_39[8] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xBD, 0xD5, 0xBF };

static const struct among a_2[40] =
{
/*  0 */ { 6, s_2_0, -1, 1, 0},
/*  1 */ { 6, s_2_1, -1, 1, 0},
/*  2 */ { 8, s_2_2, 1, 1, 0},
/*  3 */ { 8, s_2_3, -1, 1, 0},
/*  4 */ { 4, s_2_4, -1, 1, 0},
/*  5 */ { 4, s_2_5, -1, 1, 0},
/*  6 */ { 2, s_2_6, -1, 1, 0},
/*  7 */ { 6, s_2_7, 6, 1, 0},
/*  8 */ { 6, s_2_8, 6, 1, 0},
/*  9 */ { 4, s_2_9, 6, 1, 0},
/* 10 */ { 8, s_2_10, 9, 1, 0},
/* 11 */ { 8, s_2_11, 9, 1, 0},
/* 12 */ { 8, s_2_12, 6, 1, 0},
/* 13 */ { 8, s_2_13, 6, 1, 0},
/* 14 */ { 8, s_2_14, 6, 1, 0},
/* 15 */ { 10, s_2_15, 14, 1, 0},
/* 16 */ { 6, s_2_16, 6, 1, 0},
/* 17 */ { 6, s_2_17, 6, 1, 0},
/* 18 */ { 6, s_2_18, 6, 1, 0},
/* 19 */ { 6, s_2_19, -1, 1, 0},
/* 20 */ { 8, s_2_20, -1, 1, 0},
/* 21 */ { 4, s_2_21, -1, 1, 0},
/* 22 */ { 8, s_2_22, -1, 1, 0},
/* 23 */ { 4, s_2_23, -1, 1, 0},
/* 24 */ { 6, s_2_24, -1, 1, 0},
/* 25 */ { 4, s_2_25, -1, 1, 0},
/* 26 */ { 6, s_2_26, 25, 1, 0},
/* 27 */ { 8, s_2_27, 25, 1, 0},
/* 28 */ { 4, s_2_28, -1, 1, 0},
/* 29 */ { 8, s_2_29, -1, 1, 0},
/* 30 */ { 14, s_2_30, 29, 1, 0},
/* 31 */ { 4, s_2_31, -1, 1, 0},
/* 32 */ { 8, s_2_32, 31, 1, 0},
/* 33 */ { 6, s_2_33, 31, 1, 0},
/* 34 */ { 8, s_2_34, 31, 1, 0},
/* 35 */ { 8, s_2_35, -1, 1, 0},
/* 36 */ { 6, s_2_36, -1, 1, 0},
/* 37 */ { 4, s_2_37, -1, 1, 0},
/* 38 */ { 6, s_2_38, -1, 1, 0},
/* 39 */ { 8, s_2_39, -1, 1, 0}
};

static const symbol s_3_0[4] = { 0xD5, 0xA5, 0xD6, 0x80 };
static const symbol s_3_1[6] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80 };
static const symbol s_3_2[2] = { 0xD6, 0x81 };
static const symbol s_3_3[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD6, 0x81 };
static const symbol s_3_4[4] = { 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_5[8] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_6[10] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_7[6] = { 0xD6, 0x81, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_8[10] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_9[8] = { 0xD5, 0xB8, 0xD5, 0xBB, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_10[6] = { 0xD5, 0xBE, 0xD5, 0xAB, 0xD6, 0x81 };
static const symbol s_3_11[4] = { 0xD5, 0xB8, 0xD6, 0x81 };
static const symbol s_3_12[4] = { 0xD5, 0xBD, 0xD5, 0xA1 };
static const symbol s_3_13[4] = { 0xD5, 0xBE, 0xD5, 0xA1 };
static const symbol s_3_14[6] = { 0xD5, 0xA1, 0xD5, 0xB4, 0xD5, 0xA2 };
static const symbol s_3_15[2] = { 0xD5, 0xA4 };
static const symbol s_3_16[6] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xA4 };
static const symbol s_3_17[8] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xA4 };
static const symbol s_3_18[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA4 };
static const symbol s_3_19[6] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA4 };
static const symbol s_3_20[14] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA4 };
static const symbol s_3_21[8] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA4 };
static const symbol s_3_22[6] = { 0xD5, 0xB8, 0xD5, 0xBB, 0xD5, 0xA4 };
static const symbol s_3_23[2] = { 0xD5, 0xA8 };
static const symbol s_3_24[6] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xA8 };
static const symbol s_3_25[8] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xA8 };
static const symbol s_3_26[6] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA8 };
static const symbol s_3_27[14] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA8 };
static const symbol s_3_28[8] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xA8 };
static const symbol s_3_29[6] = { 0xD5, 0xB8, 0xD5, 0xBB, 0xD5, 0xA8 };
static const symbol s_3_30[2] = { 0xD5, 0xAB };
static const symbol s_3_31[6] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB };
static const symbol s_3_32[8] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB };
static const symbol s_3_33[4] = { 0xD5, 0xBE, 0xD5, 0xAB };
static const symbol s_3_34[10] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB4 };
static const symbol s_3_35[12] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB4 };
static const symbol s_3_36[10] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB4 };
static const symbol s_3_37[2] = { 0xD5, 0xB6 };
static const symbol s_3_38[6] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB6 };
static const symbol s_3_39[8] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB6 };
static const symbol s_3_40[6] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xB6 };
static const symbol s_3_41[4] = { 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_3_42[12] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_3_43[6] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xB6 };
static const symbol s_3_44[4] = { 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_3_45[8] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_3_46[10] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xAB, 0xD5, 0xB6 };
static const symbol s_3_47[14] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xB6 };
static const symbol s_3_48[4] = { 0xD5, 0xB8, 0xD5, 0xBB };
static const symbol s_3_49[14] = { 0xD5, 0xB8, 0xD6, 0x82, 0xD5, 0xA9, 0xD5, 0xB5, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xBD };
static const symbol s_3_50[8] = { 0xD5, 0xBE, 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xBD };
static const symbol s_3_51[6] = { 0xD5, 0xB8, 0xD5, 0xBB, 0xD5, 0xBD };
static const symbol s_3_52[4] = { 0xD5, 0xB8, 0xD5, 0xBE };
static const symbol s_3_53[8] = { 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB8, 0xD5, 0xBE };
static const symbol s_3_54[10] = { 0xD5, 0xB6, 0xD5, 0xA5, 0xD6, 0x80, 0xD5, 0xB8, 0xD5, 0xBE };
static const symbol s_3_55[8] = { 0xD5, 0xA1, 0xD5, 0xB6, 0xD5, 0xB8, 0xD5, 0xBE };
static const symbol s_3_56[6] = { 0xD5, 0xBE, 0xD5, 0xB8, 0xD5, 0xBE };

static const struct among a_3[57] =
{
/*  0 */ { 4, s_3_0, -1, 1, 0},
/*  1 */ { 6, s_3_1, 0, 1, 0},
/*  2 */ { 2, s_3_2, -1, 1, 0},
/*  3 */ { 6, s_3_3, 2, 1, 0},
/*  4 */ { 4, s_3_4, 2, 1, 0},
/*  5 */ { 8, s_3_5, 4, 1, 0},
/*  6 */ { 10, s_3_6, 5, 1, 0},
/*  7 */ { 6, s_3_7, 4, 1, 0},
/*  8 */ { 10, s_3_8, 4, 1, 0},
/*  9 */ { 8, s_3_9, 4, 1, 0},
/* 10 */ { 6, s_3_10, 4, 1, 0},
/* 11 */ { 4, s_3_11, 2, 1, 0},
/* 12 */ { 4, s_3_12, -1, 1, 0},
/* 13 */ { 4, s_3_13, -1, 1, 0},
/* 14 */ { 6, s_3_14, -1, 1, 0},
/* 15 */ { 2, s_3_15, -1, 1, 0},
/* 16 */ { 6, s_3_16, 15, 1, 0},
/* 17 */ { 8, s_3_17, 16, 1, 0},
/* 18 */ { 6, s_3_18, 15, 1, 0},
/* 19 */ { 6, s_3_19, 15, 1, 0},
/* 20 */ { 14, s_3_20, 19, 1, 0},
/* 21 */ { 8, s_3_21, 19, 1, 0},
/* 22 */ { 6, s_3_22, 15, 1, 0},
/* 23 */ { 2, s_3_23, -1, 1, 0},
/* 24 */ { 6, s_3_24, 23, 1, 0},
/* 25 */ { 8, s_3_25, 24, 1, 0},
/* 26 */ { 6, s_3_26, 23, 1, 0},
/* 27 */ { 14, s_3_27, 26, 1, 0},
/* 28 */ { 8, s_3_28, 26, 1, 0},
/* 29 */ { 6, s_3_29, 23, 1, 0},
/* 30 */ { 2, s_3_30, -1, 1, 0},
/* 31 */ { 6, s_3_31, 30, 1, 0},
/* 32 */ { 8, s_3_32, 31, 1, 0},
/* 33 */ { 4, s_3_33, 30, 1, 0},
/* 34 */ { 10, s_3_34, -1, 1, 0},
/* 35 */ { 12, s_3_35, 34, 1, 0},
/* 36 */ { 10, s_3_36, -1, 1, 0},
/* 37 */ { 2, s_3_37, -1, 1, 0},
/* 38 */ { 6, s_3_38, 37, 1, 0},
/* 39 */ { 8, s_3_39, 38, 1, 0},
/* 40 */ { 6, s_3_40, 37, 1, 0},
/* 41 */ { 4, s_3_41, 37, 1, 0},
/* 42 */ { 12, s_3_42, 41, 1, 0},
/* 43 */ { 6, s_3_43, 41, 1, 0},
/* 44 */ { 4, s_3_44, 37, 1, 0},
/* 45 */ { 8, s_3_45, 44, 1, 0},
/* 46 */ { 10, s_3_46, 45, 1, 0},
/* 47 */ { 14, s_3_47, 37, 1, 0},
/* 48 */ { 4, s_3_48, -1, 1, 0},
/* 49 */ { 14, s_3_49, -1, 1, 0},
/* 50 */ { 8, s_3_50, -1, 1, 0},
/* 51 */ { 6, s_3_51, -1, 1, 0},
/* 52 */ { 4, s_3_52, -1, 1, 0},
/* 53 */ { 8, s_3_53, 52, 1, 0},
/* 54 */ { 10, s_3_54, 53, 1, 0},
/* 55 */ { 8, s_3_55, 52, 1, 0},
/* 56 */ { 6, s_3_56, 52, 1, 0}
};

static const unsigned char g_v[] = { 209, 4, 128, 0, 18 };


static int r_mark_regions(struct SN_env * z) {
    z->I[0] = z->l;
    z->I[1] = z->l;
    {   int c1 = z->c; /* do, line 62 */
        {    /* gopast */ /* grouping v, line 63 */
            int ret = out_grouping_U(z, g_v, 1377, 1413, 1);
            if (ret < 0) goto lab0;
            z->c += ret;
        }
        z->I[0] = z->c; /* setmark pV, line 63 */
        {    /* gopast */ /* non v, line 63 */
            int ret = in_grouping_U(z, g_v, 1377, 1413, 1);
            if (ret < 0) goto lab0;
            z->c += ret;
        }
        {    /* gopast */ /* grouping v, line 64 */
            int ret = out_grouping_U(z, g_v, 1377, 1413, 1);
            if (ret < 0) goto lab0;
            z->c += ret;
        }
        {    /* gopast */ /* non v, line 64 */
            int ret = in_grouping_U(z, g_v, 1377, 1413, 1);
            if (ret < 0) goto lab0;
            z->c += ret;
        }
        z->I[1] = z->c; /* setmark p2, line 64 */
    lab0:
        z->c = c1;
    }
    return 1;
}

static int r_R2(struct SN_env * z) {
    if (!(z->I[1] <= z->c)) return 0;
    return 1;
}

static int r_adjective(struct SN_env * z) {
    int among_var;
    z->ket = z->c; /* [, line 73 */
    among_var = find_among_b(z, a_0, 23); /* substring, line 73 */
    if (!(among_var)) return 0;
    z->bra = z->c; /* ], line 73 */
    switch(among_var) {
        case 0: return 0;
        case 1:
            {   int ret = slice_del(z); /* delete, line 98 */
                if (ret < 0) return ret;
            }
            break;
    }
    return 1;
}

static int r_verb(struct SN_env * z) {
    int among_var;
    z->ket = z->c; /* [, line 103 */
    among_var = find_among_b(z, a_1, 71); /* substring, line 103 */
    if (!(among_var)) return 0;
    z->bra = z->c; /* ], line 103 */
    switch(among_var) {
        case 0: return 0;
        case 1:
            {   int ret = slice_del(z); /* delete, line 176 */
                if (ret < 0) return ret;
            }
            break;
    }
    return 1;
}

static int r_noun(struct SN_env * z) {
    int among_var;
    z->ket = z->c; /* [, line 181 */
    among_var = find_among_b(z, a_2, 40); /* substring, line 181 */
    if (!(among_var)) return 0;
    z->bra = z->c; /* ], line 181 */
    switch(among_var) {
        case 0: return 0;
        case 1:
            {   int ret = slice_del(z); /* delete, line 223 */
                if (ret < 0) return ret;
            }
            break;
    }
    return 1;
}

static int r_ending(struct SN_env * z) {
    int among_var;
    z->ket = z->c; /* [, line 228 */
    among_var = find_among_b(z, a_3, 57); /* substring, line 228 */
    if (!(among_var)) return 0;
    z->bra = z->c; /* ], line 228 */
    {   int ret = r_R2(z);
        if (ret == 0) return 0; /* call R2, line 228 */
        if (ret < 0) return ret;
    }
    switch(among_var) {
        case 0: return 0;
        case 1:
            {   int ret = slice_del(z); /* delete, line 287 */
                if (ret < 0) return ret;
            }
            break;
    }
    return 1;
}

extern int armenian_UTF_8_stem(struct SN_env * z) {
    {   int c1 = z->c; /* do, line 294 */
        {   int ret = r_mark_regions(z);
            if (ret == 0) goto lab0; /* call mark_regions, line 294 */
            if (ret < 0) return ret;
        }
    lab0:
        z->c = c1;
    }
    z->lb = z->c; z->c = z->l; /* backwards, line 295 */

    {   int mlimit; /* setlimit, line 295 */
        int m2 = z->l - z->c; (void)m2;
        if (z->c < z->I[0]) return 0;
        z->c = z->I[0]; /* tomark, line 295 */
        mlimit = z->lb; z->lb = z->c;
        z->c = z->l - m2;
        {   int m3 = z->l - z->c; (void)m3; /* do, line 296 */
            {   int ret = r_ending(z);
                if (ret == 0) goto lab1; /* call ending, line 296 */
                if (ret < 0) return ret;
            }
        lab1:
            z->c = z->l - m3;
        }
        {   int m4 = z->l - z->c; (void)m4; /* do, line 297 */
            {   int ret = r_verb(z);
                if (ret == 0) goto lab2; /* call verb, line 297 */
                if (ret < 0) return ret;
            }
        lab2:
            z->c = z->l - m4;
        }
        {   int m5 = z->l - z->c; (void)m5; /* do, line 298 */
            {   int ret = r_adjective(z);
                if (ret == 0) goto lab3; /* call adjective, line 298 */
                if (ret < 0) return ret;
            }
        lab3:
            z->c = z->l - m5;
        }
        {   int m6 = z->l - z->c; (void)m6; /* do, line 299 */
            {   int ret = r_noun(z);
                if (ret == 0) goto lab4; /* call noun, line 299 */
                if (ret < 0) return ret;
            }
        lab4:
            z->c = z->l - m6;
        }
        z->lb = mlimit;
    }
    z->c = z->lb;
    return 1;
}

extern struct SN_env * armenian_UTF_8_create_env(void) { return SN_create_env(0, 2, 0); }

extern void armenian_UTF_8_close_env(struct SN_env * z) { SN_close_env(z, 0); }

