/* Generate Test Data for ldn */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  int ti1;;
  iauLDBODY t1[100];;
  double t2[3];
  double t3[3];
  printf("var ldn_results = [\n");
  for (t0 = 0; t0 <= 2; t0 += 1) {
    for (ti1 = 0; ti1 <= 1; ti1 += 1) {
      long mod2 = 0;
      for (t2[0] = -0.04124432; t2[0] <= 0.04124432; t2[0] += 0.03093324) {
      for (t2[1] = -0.04124432; t2[1] <= 0.04124432; t2[1] += 0.03093324) {
      for (t2[2] = -0.04124432; t2[2] <= 0.04124432; t2[2] += 0.03093324) {
        mod2 ++;
        if (mod2 > 64) mod2 = 0;
        if (mod2 != 1) continue;
        long mod3 = 0;
        for (t3[0] = -0.04124432; t3[0] <= 0.04124432; t3[0] += 0.03093324) {
        for (t3[1] = -0.04124432; t3[1] <= 0.04124432; t3[1] += 0.03093324) {
        for (t3[2] = -0.04124432; t3[2] <= 0.04124432; t3[2] += 0.03093324) {
          mod3 ++;
          if (mod3 > 64) mod3 = 0;
          if (mod3 != 1) continue;

          double res0[3] = {0};
      t1[3] = lbodys[0];
      t1[2] = lbodys[1];
      t1[1] = lbodys[2];
      t1[0] = lbodys[t0];
          printf("  [");
          printf("%d", t0);
          printf(", ");
          exportLDBODY(t0, t1);
          printf(", ");
          exportV3(t2);
          printf(", ");
          exportV3(t3);
          printf(", ");
          iauLdn(t0, t1, t2, t3, res0);
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
