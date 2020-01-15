/* Generate Test Data for s2c */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var s2c_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {

      double res0[3] = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      eraS2c(t0, t1, res0);
      exportV3(res0);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
