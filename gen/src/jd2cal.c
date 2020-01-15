/* Generate Test Data for jd2cal */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var jd2cal_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 0.0 - 36.0 * 5.0; t1 <= 0.0 + 36.0 * 5.0; t1 += 36.0) {

      int res0 = {0};
      int res1 = {0};
      int res2 = {0};
      double res3 = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      printf("%d", eraJd2cal(t0, t1, &res0, &res1, &res2, &res3));
      printf(", ");
      printf("%d", res0);
      printf(", ");
      printf("%d", res1);
      printf(", ");
      printf("%d", res2);
      printf(", ");
      printf("%.28e", res3);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
