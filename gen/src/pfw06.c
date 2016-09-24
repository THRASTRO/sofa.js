/* Generate Test Data for pfw06 */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var pfw06_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      double res0 = {0};
      double res1 = {0};
      double res2 = {0};
      double res3 = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      iauPfw06(t0, t1, &res0, &res1, &res2, &res3);
      printf("%.28e", res0);
      printf(", ");
      printf("%.28e", res1);
      printf(", ");
      printf("%.28e", res2);
      printf(", ");
      printf("%.28e", res3);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
