/* Generate Test Data for d2tf */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  double t1;
  printf("var d2tf_results = [\n");
  for (t0 = -7; t0 <= 5; t0 += 3) {
    for (t1 = 0.0 - 36.0 * 5.0; t1 <= 0.0 + 36.0 * 5.0; t1 += 36.0) {

      char res0 = {0};
      int res1[4] = {0};
      printf("  [");
      printf("%d", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      iauD2tf(t0, t1, &res0, res1);
      printf("'%c'", res0);
      printf(", ");
      exportDMSF(res1);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
