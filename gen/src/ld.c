/* Generate Test Data for ld */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1[3];
  double t2[3];
  double t3[3];
  double t4;
  double t5;
  unsigned long long modulo = 0;
  printf("var ld_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    long mod1 = 0;
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {
      mod1 ++;
      if (mod1 > 1728) mod1 = 0;
      if (mod1 != 1) continue;
      long mod2 = 0;
      for (t2[0] = -0.04124432; t2[0] <= 0.04124432; t2[0] += 0.03093324) {
      for (t2[1] = -0.04124432; t2[1] <= 0.04124432; t2[1] += 0.03093324) {
      for (t2[2] = -0.04124432; t2[2] <= 0.04124432; t2[2] += 0.03093324) {
        mod2 ++;
        if (mod2 > 1728) mod2 = 0;
        if (mod2 != 1) continue;
        long mod3 = 0;
        for (t3[0] = -0.04124432; t3[0] <= 0.04124432; t3[0] += 0.03093324) {
        for (t3[1] = -0.04124432; t3[1] <= 0.04124432; t3[1] += 0.03093324) {
        for (t3[2] = -0.04124432; t3[2] <= 0.04124432; t3[2] += 0.03093324) {
          mod3 ++;
          if (mod3 > 1728) mod3 = 0;
          if (mod3 != 1) continue;
          for (t4 = -12; t4 <= 12; t4 += 3.75) {
            for (t5 = -12; t5 <= 12; t5 += 3.75) {

              double res0[3] = {0};
              modulo = modulo > 202
                ? 0 : modulo + 1;
              if (modulo != 1) continue;
              printf("  [");
              printf("%.28e", t0);
              printf(", ");
              exportV3(t1);
              printf(", ");
              exportV3(t2);
              printf(", ");
              exportV3(t3);
              printf(", ");
              printf("%.28e", t4);
              printf(", ");
              printf("%.28e", t5);
              printf(", ");
              iauLd(t0, t1, t2, t3, t4, t5, res0);
              exportV3(res0);
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

  printf("];\n");
}
