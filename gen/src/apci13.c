/* Generate Test Data for apci13 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  printf("var apci13_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      eraASTROM res0 = {0};
      double res1 = {0};
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      eraApci13(t0, t1, &res0, &res1);
      exportASTROM(res0);
      printf(", ");
      printf("%.28e", res1);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
