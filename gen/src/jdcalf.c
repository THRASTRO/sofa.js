/* Generate Test Data for jdcalf */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  double t1;
  double t2;
  printf("var jdcalf_results = [\n");
  for (t0 = -7; t0 <= 5; t0 += 3) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {

        int res0[4] = {0};
        printf("  [");
        printf("%d", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        printf("%d", eraJdcalf(t0, t1, t2, res0));
        printf(", ");
        exportDMSF(res0);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
