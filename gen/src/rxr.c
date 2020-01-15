/* Generate Test Data for rxr */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  double t1[3][3];
  double _t1[3][3];
  unsigned long long modulo = 0;
  printf("var rxr_results = [\n");
  long mod0 = 0;
  for (_t0[0][0] = 0; _t0[0][0] <= 1; _t0[0][0] += 1) {
  for (_t0[0][1] = 0; _t0[0][1] <= 1; _t0[0][1] += 1) {
  for (_t0[0][2] = 0; _t0[0][2] <= 1; _t0[0][2] += 1) {
  for (_t0[1][0] = 0; _t0[1][0] <= 1; _t0[1][0] += 1) {
  for (_t0[1][1] = 0; _t0[1][1] <= 1; _t0[1][1] += 1) {
  for (_t0[1][2] = 0; _t0[1][2] <= 1; _t0[1][2] += 1) {
  for (_t0[2][0] = 0; _t0[2][0] <= 1; _t0[2][0] += 1) {
  for (_t0[2][1] = 0; _t0[2][1] <= 1; _t0[2][1] += 1) {
  for (_t0[2][2] = 0; _t0[2][2] <= 1; _t0[2][2] += 1) {
    mod0 ++;
    if (mod0 > 191102976) mod0 = 0;
    if (mod0 != 1) continue;
    long mod1 = 0;
    for (_t1[0][0] = 0; _t1[0][0] <= 1; _t1[0][0] += 1) {
    for (_t1[0][1] = 0; _t1[0][1] <= 1; _t1[0][1] += 1) {
    for (_t1[0][2] = 0; _t1[0][2] <= 1; _t1[0][2] += 1) {
    for (_t1[1][0] = 0; _t1[1][0] <= 1; _t1[1][0] += 1) {
    for (_t1[1][1] = 0; _t1[1][1] <= 1; _t1[1][1] += 1) {
    for (_t1[1][2] = 0; _t1[1][2] <= 1; _t1[1][2] += 1) {
    for (_t1[2][0] = 0; _t1[2][0] <= 1; _t1[2][0] += 1) {
    for (_t1[2][1] = 0; _t1[2][1] <= 1; _t1[2][1] += 1) {
    for (_t1[2][2] = 0; _t1[2][2] <= 1; _t1[2][2] += 1) {
      mod1 ++;
      if (mod1 > 191102976) mod1 = 0;
      if (mod1 != 1) continue;

      double res0[3][3] = {0};
      modulo = modulo > 202
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
      memcpy(&t1, &_t1, sizeof t1);
      printf("  [");
      exportMAT33(t0);
      printf(", ");
      exportMAT33(t1);
      printf(", ");
      eraRxr(t0, t1, res0);
      exportMAT33(res0);
      printf("  ],\n");

    }
    }
    }
    }
    }
    }
    }
    }
    }
  }
  }
  }
  }
  }
  }
  }
  }
  }

  printf("];\n");
}
