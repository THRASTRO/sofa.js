/* Generate Test Data for c2ixys */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var c2ixys_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -28; t1 <= 28; t1 += 21) {
      for (t2 = -28; t2 <= 28; t2 += 21) {

        double res0[3][3] = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        eraC2ixys(t0, t1, t2, res0);
        exportMAT33(res0);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
