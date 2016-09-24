/* Generate Test Data for ab */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  double t1[3];
  double t2;
  double t3;
  unsigned long long modulo = 0;
  printf("var ab_results = [\n");
  long mod0 = 0;
  for (t0[0] = - 1.73333 * 10.0; t0[0] <= + 1.73333 * 10.0; t0[0] += 1.73333) {
  for (t0[1] = - 1.73333 * 10.0; t0[1] <= + 1.73333 * 10.0; t0[1] += 1.73333) {
  for (t0[2] = - 1.73333 * 10.0; t0[2] <= + 1.73333 * 10.0; t0[2] += 1.73333) {
    mod0 ++;
    if (mod0 > 64) mod0 = 0;
    if (mod0 != 1) continue;
    long mod1 = 0;
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {
      mod1 ++;
      if (mod1 > 64) mod1 = 0;
      if (mod1 != 1) continue;
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {

          double res0[3] = {0};
          modulo = modulo > 60
            ? 0 : modulo + 1;
          if (modulo != 1) continue;
          printf("  [");
          exportV3(t0);
          printf(", ");
          exportV3(t1);
          printf(", ");
          printf("%.28e", t2);
          printf(", ");
          printf("%.28e", t3);
          printf(", ");
          iauAb(t0, t1, t2, t3, res0);
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

  printf("];\n");
}
