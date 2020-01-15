/* Generate Test Data for ppsp */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3];
  double t1;
  double t2[3];
  printf("var ppsp_results = [\n");
  long mod0 = 0;
  for (t0[0] = -0.04124432; t0[0] <= 0.04124432; t0[0] += 0.03093324) {
  for (t0[1] = -0.04124432; t0[1] <= 0.04124432; t0[1] += 0.03093324) {
  for (t0[2] = -0.04124432; t0[2] <= 0.04124432; t0[2] += 0.03093324) {
    mod0 ++;
    if (mod0 > 64) mod0 = 0;
    if (mod0 != 1) continue;
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      long mod2 = 0;
      for (t2[0] = -0.04124432; t2[0] <= 0.04124432; t2[0] += 0.03093324) {
      for (t2[1] = -0.04124432; t2[1] <= 0.04124432; t2[1] += 0.03093324) {
      for (t2[2] = -0.04124432; t2[2] <= 0.04124432; t2[2] += 0.03093324) {
        mod2 ++;
        if (mod2 > 64) mod2 = 0;
        if (mod2 != 1) continue;

        double res0[3] = {0};
        printf("  [");
        exportV3(t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportV3(t2);
        printf(", ");
        eraPpsp(t0, t1, t2, res0);
        exportV3(res0);
        printf("  ],\n");

      }
      }
      }
    }
  }
  }
  }

  printf("];\n");
}
