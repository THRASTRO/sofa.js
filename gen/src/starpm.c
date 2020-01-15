/* Generate Test Data for starpm */

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
  unsigned long long modulo = 0;
  printf("var starpm_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {
          for (t4 = -12; t4 <= 12; t4 += 3.75) {
            for (t5 = -12; t5 <= 12; t5 += 3.75) {
              for (t6 = -12; t6 <= 12; t6 += 3.75) {
                for (t7 = -12; t7 <= 12; t7 += 3.75) {
                  for (t8 = -12; t8 <= 12; t8 += 3.75) {
                    for (t9 = -12; t9 <= 12; t9 += 3.75) {

                      double res0 = {0};
                      double res1 = {0};
                      double res2 = {0};
                      double res3 = {0};
                      double res4 = {0};
                      double res5 = {0};
                      modulo = modulo > 9246349
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
                      printf("%d", eraStarpm(t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, &res0, &res1, &res2, &res3, &res4, &res5));
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

  printf("];\n");
}
