/* Generate Test Data for atco13 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  double t4;
  double t5;
  double t6;
  double t7;
  double t8;
  double t9;
  double t10;
  double t11;
  double t12;
  double t13;
  double t14;
  double t15;
  double t16;
  double t17;
  unsigned long long modulo = 0;
  printf("var atco13_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {
        for (t3 = -28; t3 <= 28; t3 += 21) {
          for (t4 = -28; t4 <= 28; t4 += 21) {
            for (t5 = -28; t5 <= 28; t5 += 21) {
              for (t6 = -28; t6 <= 28; t6 += 21) {
                for (t7 = -28; t7 <= 28; t7 += 21) {
                  for (t8 = -28; t8 <= 28; t8 += 28) {
                    for (t9 = -28; t9 <= 28; t9 += 28) {
                      for (t10 = -28; t10 <= 28; t10 += 28) {
                        for (t11 = -28; t11 <= 28; t11 += 28) {
                          for (t12 = -28; t12 <= 28; t12 += 28) {
                            for (t13 = -28; t13 <= 28; t13 += 28) {
                              for (t14 = -28; t14 <= 28; t14 += 28) {
                                for (t15 = -28; t15 <= 28; t15 += 28) {
                                  for (t16 = -28; t16 <= 28; t16 += 28) {
                                    for (t17 = -28; t17 <= 28; t17 += 28) {

                                      double res0 = {0};
                                      double res1 = {0};
                                      double res2 = {0};
                                      double res3 = {0};
                                      double res4 = {0};
                                      double res5 = {0};
                                      modulo = modulo > 6696818013100814336
                                        ? 0 : modulo + 1;
                                      if (modulo != 1) continue;
                                      printf("  [");
                                      printf("%.28e", t0);
                                      printf(", ");
                                      printf("%.28e", t1);
                                      printf(", ");
                                      printf("%.28e", t2);
                                      printf(", ");
                                      printf("%.28e", t3);
                                      printf(", ");
                                      printf("%.28e", t4);
                                      printf(", ");
                                      printf("%.28e", t5);
                                      printf(", ");
                                      printf("%.28e", t6);
                                      printf(", ");
                                      printf("%.28e", t7);
                                      printf(", ");
                                      printf("%.28e", t8);
                                      printf(", ");
                                      printf("%.28e", t9);
                                      printf(", ");
                                      printf("%.28e", t10);
                                      printf(", ");
                                      printf("%.28e", t11);
                                      printf(", ");
                                      printf("%.28e", t12);
                                      printf(", ");
                                      printf("%.28e", t13);
                                      printf(", ");
                                      printf("%.28e", t14);
                                      printf(", ");
                                      printf("%.28e", t15);
                                      printf(", ");
                                      printf("%.28e", t16);
                                      printf(", ");
                                      printf("%.28e", t17);
                                      printf(", ");
                                      printf("%d", eraAtco13(t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, &res0, &res1, &res2, &res3, &res4, &res5));
                                      printf(", ");
                                      printf("%.28e", res0);
                                      printf(", ");
                                      printf("%.28e", res1);
                                      printf(", ");
                                      printf("%.28e", res2);
                                      printf(", ");
                                      printf("%.28e", res3);
                                      printf(", ");
                                      printf("%.28e", res4);
                                      printf(", ");
                                      printf("%.28e", res5);
                                      printf("  ],\n");

                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  printf("];\n");
}
