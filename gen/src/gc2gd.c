/* Generate Test Data for gc2gd */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  double t1[3];
  printf("var gc2gd_results = [\n");
  for (t0 = 1; t0 <= 3; t0 += 1) {
    for (t1[0] = -0.04124432; t1[0] <= 0.04124432; t1[0] += 0.03093324) {
    for (t1[1] = -0.04124432; t1[1] <= 0.04124432; t1[1] += 0.03093324) {
    for (t1[2] = -0.04124432; t1[2] <= 0.04124432; t1[2] += 0.03093324) {

      double res0 = {0};
      double res1 = {0};
      double res2 = {0};
      printf("  [");
      printf("%d", t0);
      printf(", ");
      exportV3(t1);
      printf(", ");
      printf("%d", iauGc2gd(t0, t1, &res0, &res1, &res2));
      printf(", ");
      printf("%.28e", res0);
      printf(", ");
      printf("%.28e", res1);
      printf(", ");
      printf("%.28e", res2);
      printf("  ],\n");

    }
    }
    }
  }

  printf("];\n");
}
