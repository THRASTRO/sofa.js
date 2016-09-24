/* Generate Test Data for a2af */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  double t1;
  printf("var a2af_results = [\n");
  for (t0 = -7; t0 <= 5; t0 += 3) {
    for (t1 = - 195; t1 <= + 195; t1 += 180 / 24.0) {

      char res0 = {0};
      int res1[4] = {0};
      printf("  [");
      printf("%d", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      iauA2af(t0, t1, &res0, res1);
      printf("'%c'", res0);
      printf(", ");
      exportDMSF(res1);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
