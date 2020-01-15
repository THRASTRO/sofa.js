/* Generate Test Data for pom00 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  printf("var pom00_results = [\n");
  for (t0 = -28; t0 <= 28; t0 += 21) {
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
        eraPom00(t0, t1, t2, res0);
        exportMAT33(res0);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
